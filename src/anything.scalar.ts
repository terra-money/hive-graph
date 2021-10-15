import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ObjectValueNode, ValueNode } from 'graphql'

function parseObject(ast: ObjectValueNode): Record<string, any> {
  const value: Record<string, any> = {}

  ast.fields.forEach((field) => {
    value[field.name.value] = parseLiteral(field.value)
  })

  return value
}

function parseLiteral(ast: ValueNode): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT:
      return parseObject(ast)
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(n))
    case Kind.NULL:
      return null
    default:
      return null
  }
}

@Scalar('Anything')
export class AnythingScalar implements CustomScalar<string, any> {
  parseValue(value: any): string {
    return value
  }

  serialize(value: any): any {
    // see if value implements toData() interface
    // if it does, use that
    // otherwise, return as is (unknown)
    if (typeof value === 'object' && Reflect.has(value, 'toData')) {
      const toData = Reflect.get(value, 'toData')
      return Reflect.apply(toData, value, [])
    }

    return value
  }

  parseLiteral(ast: ValueNode): any {
    return parseLiteral(ast)
  }
}
