#!/usr/bin/env perl

my $sha2 = &hashr('SHA-256',1,'michel@GCB');
printf "sha32: %s\n",&encode_base32($sha2);
printf "sha58: %s\n",&encode_base58($sha2);
my $l0 = length($sha2);
my $l16 = 2 * $l0;
my $l32 = int(4 * log(4) / log(32) * $l0) + 1;
my $l58 = int(4 * log(4) / log(58) * $l0) + 1;

for (1 .. $l0) {
 my $bin = substr($sha2,0,$_) . "\0" x ($l0 - $_);  # TBD padding ...

 my $bin32 = &encode_base32($bin);
 my $bin58 = &encode_base58($bin);
 printf "%2d %${l16}s: %-${l32}s %-${l58}s\n",$_,unpack('H*',$bin),$bin32,$bin58;
}

exit $?;

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

1;
