const path = require('path')
const express = require('express')
const ExcelJS = require('exceljs')
const rendimientos = express.Router()
const fotos = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

var pdfName = ""

const Fotos = require('../Models/Fotos.js')
const Rendimientos = require('../Models/Rendimientos.js')
rendimientos.use(cors())

process.env.SECRET_KEY = 'secret'

rendimientos.post('/rendimientos',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
		Kilometraje: req.body.Kilometraje,
		ConsumoDiesel: req.body.ConsumoDiesel,
		RendimientoDiesel: req.body.RendimientoDiesel,
