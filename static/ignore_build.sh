#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]] ; then
    exit 0;
else
    exit 1;
fi
