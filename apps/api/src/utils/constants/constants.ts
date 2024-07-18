export const errorMessages: { [key: string]: string } = {
  "No Authorization was found in request.headers": "401-notFound",
  "Authorization token is invalid: The token is malformed": "401-token",
  "Authorization token expired": "401-expired",
  "Not authorized": "403-default"
}


export const userJsonSchema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string"
    },
    "roles": {
      "type": "array",
      "items": {
        "enum": ["admin", "client", "owner"]
      }
    },
    "orders": {
      "type": "array",
      "items": {
        "type": "string",
      }
    },
  },
  "required": ["name", "email", "password", "roles", "orders"]
}


export const productJsonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    category: {
      type: 'string'
    },
    stock: {
      type: 'number'
    }
  },
  required: ['name', 'description', 'price', 'category', 'stock'],
};

export const orderJsonSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'string',
    },
    purchase: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          product: {
            type: 'string',
          },
          amount: {
            type: 'number',
          },
        },
        required: ['product', 'amount'],
      },
    },
    total: {
      type: 'number',
    },
    state: {
      type: 'string',
      enum: ['pending', 'sent', 'delivered', 'canceled'],
    },
    date: {
      type: 'string',
    },
  },
  required: ['user', 'purchase', 'total', 'state', 'date'],
};

export const signInSchema = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string"
    },
  },
  required: ['email', 'password'],
}