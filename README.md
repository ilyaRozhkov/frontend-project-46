### Hexlet tests and linter status:
[![Actions Status](https://github.com/ilyaRozhkov/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ilyaRozhkov/frontend-project-46/actions)

Gendiff is a command line utility that compares two files and prints the result.
Can work with JSON and YML. Outputs the result in three formats: stylish (default), plain and json.

### Install
Clone this repo: 
```
git clone https://github.com/alllenk1/frontend-project-46.git
```

Go to the project folder: 
```
cd frontend-project-46
```

Install package: 
```
make install
npm link
```

### Usage
To read help:
```
gendiff -h
```

To see version:
```
gendiff -V
```

To compare two files:
```
gendiff <path to file1> <path to file2>
```

To select the output format:
```
gendiff --format plain <path to file1> <path to file2>
```
