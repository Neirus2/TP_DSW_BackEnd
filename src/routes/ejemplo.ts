const express = require('express');
import { NextFunction, Request, Response } from 'express';
import { Product } from "../models/product";
import { it } from 'node:test'

const app = express()
app.use(express.json())

//character -> /api/characters/

//post /api/characters -> crear nuevos character
//delete /api/characters/:id -> borrar character con id = :id
//put & patch /api/characters/:id -> modificar character con id = :id

const products = [
  new Product(
    'Placa de Video Gigabyte',
    100,
    200000,
    'a02b91bc-3769-4221-beb1-d7a3aeba7mum'
  ),
]

function createNewProduct(req: Request, res: Response, next: NextFunction) {
  req.body.createNewProduct = {
    desc: req.body.desc,
    stock: req.body.stock,
    price: req.body.price,
  }
  //more checks here

  Object.keys(req.body.createNewProduct).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

app.get('/products', (req, res) => {
  res.json({ data: products })
})
/*
app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product.id === req.params.id)
  if (!product) {
    return res.status(404).send({ message: 'Product not found' })
  }
  res.json({ data: product })
})

app.post('/api/characters', sanitizeCharacterInput, (req, res) => {
  const input = req.body.sanitizedInput

  const character = new Character(
    input.name,
    input.characterClass,
    input.level,
    input.hp,
    input.mana,
    input.attack,
    input.items
  )

  characters.push(character)
  return res.status(201).send({ message: 'Character created', data: character })
})

app.put('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  const characterIdx = characters.findIndex((character) => character.id === req.params.id)

  if (characterIdx === -1) {
    return res.status(404).send({ message: 'Character not found' })
  }

  characters[characterIdx] = { ...characters[characterIdx], ...req.body.sanitizedInput }

  return res.status(200).send({ message: 'Character updated successfully', data: characters[characterIdx] })
})

app.patch('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  const characterIdx = characters.findIndex((character) => character.id === req.params.id)

  if (characterIdx === -1) {
    return res.status(404).send({ message: 'Character not found' })
  }

  Object.assign(characters[characterIdx], req.body.sanitizedInput)

  return res.status(200).send({ message: 'Character updated successfully', data: characters[characterIdx] })
})

app.delete('/api/characters/:id', (req, res) => {
  const characterIdx = characters.findIndex((character) => character.id === req.params.id)

  if (characterIdx === -1) {
    res.status(404).send({ message: 'Character not found' })
  } else {
    characters.splice(characterIdx, 1)
    res.status(200).send({ message: 'Character deleted successfully' })
  }
})

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
*/