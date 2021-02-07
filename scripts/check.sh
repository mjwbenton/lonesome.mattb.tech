#!/bin/sh
prettier --check '**/*' -u --ignore-path ../../.prettierignore
tsc --noEmit
