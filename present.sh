#!/bin/bash

LIB=$HOME/Source/Reveal/present

case $1 in
  new )
    $LIB/new-dir $2
    ;;

  serve )
    $LIB/serve $2
    ;;

  export )
    cd $LIB
    ./export $2
    ;;
esac
