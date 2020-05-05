#!/usr/bin/env perl

my $pattern = shift;


# nb char for 256bit (encoded)
my $size = 256; # 32B
print "lengths:\n";
my $l58 = int($size*log(2)/log(58) + 0.999); print "l58: $l58\n";
my $l32 = int($size*log(2)/log(32) + 0.999); print "l32: $l32\n";
my $l16 = int($size*log(2)/log(16) + 0.999); print "l16: $l16\n";
my $l2 = int($size*log(2)/log(2) + 0.999); print "l2: $l2\n";


# precompute binary string to match ...
if ($pattern =~ m/^Qm[a-fNP-Z]/) {
   my $pad = '1' x ($l58 - length($pattern)+2);
   $hdr = pack'H*','1220';
   print "pat: $pattern.$pad\n";
   my $len = int(length($pattern)*log(58)/log(256) + 0.999); # length of bin ...
   $bin = &decode_base58($pattern .$pad);
   $bin = &decode_base58(substr($pattern.$pad,0,$l58+2)) if (length($bin) > $size/8 + 2); # truncate if necessary
   $enc = &encode_base58($bin);
   printf "bin: f%s (%dB)\n",unpack('H*',$bin),length($bin);
   printf "enc: z%s (%dc)\n",$enc,length($enc);
   $bin = substr($bin,0,int(length($pattern)*log(58)/log(256) + 0.999));
   printf "regexpr: /%s/ (%dB)\n",unpack('H*',$bin),length($bin);

} elsif ($pattern =~ m/^z/) {
   $pattern = substr($pattern,1);
   my $pad = '1' x ($l58 - length($pattern));
   my $mhash = &decode_base58($pattern.$pad);
   $hdr = substr($mhash,0,4);
   $bin = substr($mhash,4);
   $bin = &decode_base58(substr($pattern.$pad,0,$l58-1)) if (length($bin) > $size/8);
   $bin = substr($bin,0,int(length($pattern)*log(58)/log(256) + 0.999));
   printf "mh58: /z.%s/ (%uc,%uB): f%s\n",$pat,length($pattern),length($bin),unpack('H*',$bin);
} elsif ($pattern =~ m/^h/) { # base 32n
   $pattern = substr($pattern,1);
   my $pad = '1' x ($l58 - length($pattern));
   $bin = &decode_basen($pattern.$pad,32);
   $bin = substr($bin,0,int(length($pattern)*log(32)/log(256) + 0.999));
   printf "mh32: /h.%s/ (%uc,%uB): f%s\n",$pattern,length($pattern),length($bin),unpack('H*',$bin);

} elsif ($pattern =~ m/^b/) {
   my $pattern = substr($pattern,1);
   my $pad = '1' x ($l58 - length($pattern));
   $bin = &decode_base32($pattern.$pad);
   $bin = substr($bin,0,int(length($pattern)*log(32)/log(256) + 0.999));
   printf "mh32z: /b.%s/ (%uc,%uB): f%s\n",$pattern,length($pattern),length($bin),unpack('H*',$bin);

}


# Vanity loop ...
$| = 1;
my $n = 5583370;
my $l = length($bin);
my $l58 = 4*log(4)/log(58)*$l+2; #  4*log(4) = log(256)
my $l32 = 18; # 4*log(4)/log(32)*$l+2;
my $l16 = 16; # 2*$l;
my $padding = "\0" x (32 - $l);
printf "searching for bin: f%s* (%uc)\n",unpack('H*',$bin),$l;
while(1) {
 $n++;
 my $sha2 = &hashr('SHA-256',1,pack('N',$n));
 my $vy = substr("\x12\x20".$sha2,0,$l);
 printf "%10u: vy:%s",$n,unpack('H*',$vy);
 if ($vy eq $bin) {
    $mh58 = substr(&encode_base58($hdr.$sha2),0,$l58+2);
    $mh32 = substr(&encode_base32($hdr.$sha2),0,$l32+2);
    $mh16 = '1220'.substr(unpack('H*',$sha2),0,$l16);
    printf " f%s* z%s* b%s* <--- %u/%u",$mh16,$mh58,$mh32,$seen{$vy}++,$i;
   
    if ($seen{$vy} > 1) {
       print ' *';
       last if ($seen{$vy} > 10);
    }
    print "\n";
 }
 print "\r" if 1;
 $i++;
}

exit $?;


# ---------------------------------------------------------
sub base58 { # 62 char except 0IOl
  use integer;
  my ($n) = @_;
  my $e = '';
  return('1') if $n == 0;
  while ( $n ) {
    my $c = $n % 58;
    $e .=  chr(0x31 + $c); # 0x31: 0 excluded
    $n = int $n / 58;
  }
  $e =~ y/1-j/1-9A-HJ-NP-Za-km-z/;
  return scalar reverse $e;
}
# -----------------------------------------------------
sub ubase58 { # .123456789ABCDEFH.JKLMN.PQRSTUVWXYZabcdefghijk.mnopqrstuvwxyz
  my ($s) = @_;
  $s =~ y/1-9A-HJ-NP-Za-km-z/1-j/;
  my $n = 0;
  while ($s ne '') {
    my $c = substr($s,0,1,'');
    my $v = ord($c) - 0x31;
    #print "{c:$c}{v:$v}{n:$n}\n";
    $n *= 58; $n += $v;
  }
  return $n;
}
# ---------------------------------------------------------
sub hashr {
   my $alg = shift;
   my $rnd = shift;
   my $tmp = join('',@_);
   use Digest qw();
   my $msg = Digest->new($alg) or die $!;
   for (1 .. $rnd) {
      $msg->add($tmp);
      $tmp = $msg->digest();
      $msg->reset;
   }
   return $tmp
}
# ---------------------------------------------------------
sub decode_base58 {  # 62 char except 0IOl
  use Math::BigInt;
  my ($str,$alphab) = @_;
  my $i = 0;
  $alphab = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz' unless $alphab; # bitcoin alphabet
  my %value = map { $_ => $i++; } split //, $alphab;

  my $radix = Math::BigInt->new(length($alphab));
  my $n = Math::BigInt->from_hex(0);
  for( split //, $str ) {
      $n = $n->bmul($radix);
      $n = $n->badd($value{$_});
  }
  return $n->to_bytes();
}
sub decode_base32 {
  use MIME::Base32 qw();
  my $bin = MIME::Base32::decode($_[0]);
  return $bin;
}

# ---------------------------------------------------------
sub encode_base58 {
  use Math::BigInt;
  use Encode::Base58::BigInt qw();
  my $bin = join'',@_;
  my $bint = Math::BigInt->from_bytes($bin);
  my $h58 = Encode::Base58::BigInt::encode_base58($bint);
  $h58 =~ tr/a-km-zA-HJ-NP-Z/A-HJ-NP-Za-km-z/;
  return $h58;
}
sub encode_base32 {
  use MIME::Base32 qw();
  my $mh32 = uc MIME::Base32::encode($_[0]);
  return $mh32;
}
# ---------------------------------------------------------
sub encode_basen { # n < 94;
  use Math::BigInt;
  my ($data,$radix) = @_;
  my $alphab = &alphab($radix);;
  my $mod = Math::BigInt->new($radix);
  #printf "mod: %s, lastc: %s\n",$mod,substr($alphab,$mod,1);
  my $h = '0x'.unpack('H*',$data);
  my $n = Math::BigInt->from_hex($h);
  my $e = '';
  while ($n->bcmp(0) == +1)  {
    my $c = Math::BigInt->new();
    ($n,$c) = $n->bdiv($mod);
    $e .= substr($alphab,$c->numify,1);
  }
  return scalar reverse $e;
}
# ---------------------------
sub decode_basen { # n < 94
  use Math::BigInt;
  my ($s,$radix) = @_;
  my $alphab = &alphab($radix);;
  die "alphab: %uc < %d\n",length($alphab) if (length($alphab) < $radix);
  my $n = Math::BigInt->new(0);
  my $j = Math::BigInt->new(1);
  while($s ne '') {
    my $c = substr($s,-1,1,''); # consume chr from the end !
    my $i = index($alphab,$c);
    return '' if ($i < 0);
    my $w = $j->copy();
    $w->bmul($i);
    $n->badd($w);
    $j->bmul($radix);
  }
  my $h = $n->as_hex();
  # byte alignment ...
  my $d = int( (length($h)+1-2)/2 ) * 2;
  $h = substr('0' x $d . substr($h,2),-$d);
  return pack('H*',$h);
}
# ---------------------------------------------------------
sub alphab {
  my $radix = shift;
  my $alphab;
  if ($radix < 12) {
    $alphab = '0123456789-';
  } elsif ($radix <= 16) {
    $alphab = '0123456789ABCDEF';
  } elsif ($radix <= 26) {
    $alphab = 'ABCDEFGHiJKLMNoPQRSTUVWXYZ';
  } elsif ($radix == 32) {
    $alphab = '0123456789ABCDEFGHiJKLMNoPQRSTUV'; # Triacontakaidecimal
    $alphab = join('',('A' .. 'Z', '2' .. '7')); # RFC 4648
    $alphab = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; # Crockfordś
    $alphab = 'ybndrfg8ejkmcpqxotluwisza345h769';  # z-base32

  } elsif ($radix == 36) {
    $alphab = 'ABCDEFGHiJKLMNoPQRSTUVWXYZ0123456789'; 
  } elsif ($radix <= 37) {
    $alphab = '0123456789ABCDEFGHiJKLMNoPQRSTUVWXYZ.'; 
  } elsif ($radix == 43) {
    $alphab = 'ABCDEFGHiJKLMNoPQRSTUVWXYZ0123456789 -+.$%*';
  } elsif ($radix == 58) {
    $alphab = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  } else { # n < 94
    $alphab = '-0123456789'. 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.
                             'abcdefghijklmnopqrstuwvxyz'.
             q/+.@$%_,~`'=;!^[]{}()#&/.      '<>:"/\\|?*'; #
  } 
  # printf "// alphabet: %s (%uc)\n",$alphab,length($alphab);
  return $alphab;
}
# ---------------------------------------------------------

1;
