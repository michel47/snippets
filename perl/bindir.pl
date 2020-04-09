#!/usr/bin/perl
#
# $Creator: Michel G. Combes$
# $Date: Thu Apr  9 07:13:46 CEST 2020$

my $dbug=0; sub info(@){};
#understand variable=value on the command line...
eval "\$$1='$2'"while $ARGV[0] =~ /^(\w+)=(.*)/ && shift;
#info "__FILE__: %s\n",__FILE__;
info "--- # \$0: %s\n",$0 ;
# ----------------------------------------------------------
my$p=rindex($0,'/',length($0)-9);
our$bindir=($p>0)?substr($0,0,$p):'.';
info "p: %s\n",$p ;
info "bindir: $bindir\n";
# ----------------------------------------------------------
info "...\n";
exit $?;

sub info(@) {
 printf @_ if $dbug;
}

1; # $Source: /my/perl/snippets/bindir.pl$

