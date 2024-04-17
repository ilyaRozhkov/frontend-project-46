### Hexlet tests and linter status:
[![Actions Status](https://github.com/ilyaRozhkov/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ilyaRozhkov/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/39067f9ba228824a9a93/maintainability)](https://codeclimate.com/github/ilyaRozhkov/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/39067f9ba228824a9a93/test_coverage)](https://codeclimate.com/github/ilyaRozhkov/frontend-project-46/test_coverage)

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
