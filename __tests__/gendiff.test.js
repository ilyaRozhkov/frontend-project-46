import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('stylish test json', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`)
})

test('stylish test yml', () => {
  expect(gendiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'stylish')).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`)
})

test('plain test json', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'))
    .toEqual(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`)
})

test('plain test yml', () => {
  expect(gendiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'plain'))
    .toEqual(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`)
})

test('formatJson test json', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(`{
  "key": "common",
  "type": "nested",
  "children": [
    {
      "key": "follow",
      "type": "added",
      "value": false
    },
    {
      "key": "setting1",
      "type": "unchanged",
      "value": "Value 1"
    },
    {
      "key": "setting2",
      "type": "removed",
      "value": 200
    },
    {
      "key": "setting3",
      "type": "changed",
      "oldValue": true,
      "newValue": null
    },
    {
      "key": "setting4",
      "type": "added",
      "value": "blah blah"
    },
    {
      "key": "setting5",
      "type": "added",
      "value": {
        "key5": "value5"
      }
    },
    {
      "key": "setting6",
      "type": "nested",
      "children": [
        {
          "key": "doge",
          "type": "nested",
          "children": [
            {
              "key": "wow",
              "type": "changed",
              "oldValue": "",
              "newValue": "so much"
            }
          ]
        },
        {
          "key": "key",
          "type": "unchanged",
          "value": "value"
        },
        {
          "key": "ops",
          "type": "added",
          "value": "vops"
        }
      ]
    }
  ]
}`)
})

test('formatJson test yml', () => {
  expect(gendiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'json')).toEqual(`{
  "key": "common",
  "type": "nested",
  "children": [
    {
      "key": "follow",
      "type": "added",
      "value": false
    },
    {
      "key": "setting1",
      "type": "unchanged",
      "value": "Value 1"
    },
    {
      "key": "setting2",
      "type": "removed",
      "value": 200
    },
    {
      "key": "setting3",
      "type": "changed",
      "oldValue": true,
      "newValue": null
    },
    {
      "key": "setting4",
      "type": "added",
      "value": "blah blah"
    },
    {
      "key": "setting5",
      "type": "added",
      "value": {
        "key5": "value5"
      }
    },
    {
      "key": "setting6",
      "type": "nested",
      "children": [
        {
          "key": "doge",
          "type": "nested",
          "children": [
            {
              "key": "wow",
              "type": "changed",
              "oldValue": "",
              "newValue": "so much"
            }
          ]
        },
        {
          "key": "key",
          "type": "unchanged",
          "value": "value"
        },
        {
          "key": "ops",
          "type": "added",
          "value": "vops"
        }
      ]
    }
  ]
}`)
})
