import { readFileSync } from 'node:fs'
import yaml from 'js-yaml'

export default function (path) {
  const file = readFileSync(path, 'utf-8')
  const splitPath = path.split('.')
  const extension = splitPath[splitPath.length - 1]

  if (extension === 'json') {
    return JSON.parse(file)
  }
  else {
    return yaml.load(file)
  }
}
