#!/usr/bin/env sh
# For custom python3 binary
PYTHON3=python3

mkdir thirdparties
# Get my custom python codebase
git clone --depth=1 https://github.com/as43z/libpy.git thirdparties/libpy/
cd thirdparties/libpy/

# Build codebase
PYTHON3 setup.py develop
pip install . 
cd ../../

