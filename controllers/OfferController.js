import models from "../models";
const { validationResult } = require("express-validator");

export default {
    add: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                response: {
                    status: "error",
                    http_code: "400",
                    errors: errors.array() 
                },
                data: {}
            });
        }
        try {
            const reg = await models.Offer.create(req.body);
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: [{
                        "value": "",
                        "msg": "huvo un error interno del servidor",
                        "param": "",
                        "location": ""}]
                },
                data: {}
            });
            next(e);
        }
    },
    query: async (req, res, next) =>{
        try {
            const reg = await models.Offer.findOne({_id: req.query._id});
            if (!reg) {
                res.status(404).send({
                    response: {
                        status: "error",
                        http_code: "500",
                        errors: [{
                            "value": "",
                            "msg": "La oferta no existe",
                            "param": "",
                            "location": ""}]
                    },
                    data: {}
                })
            }else{
                res.status(200).json({ 
                    response: {
                        status: "ok",
                        http_code: "200",
                        errors: []
                    },
                    data: {
                        reg
                    }
                });
            }
            
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: [{
                        "value": "",
                        "msg": "huvo un error interno del servidor",
                        "param": "",
                        "location": ""}]
                },
                data: {}
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const reg = await models.Offer.find();
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: [{
                        "value": "",
                        "msg": "huvo un error interno del servidor",
                        "param": "",
                        "location": ""}]
                },
                data: {}
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                response: {
                    status: "error",
                    http_code: "400",
                    errors: errors.array() 
                },
                data: {}
            });
        }
        try {
            const getId = req.params.id;

            const reg = await models.Offer.updateOne({ _id: getId }, {
                name: req.body.name,
                price: req.body.price,
                img: req.body.img,
            });

            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: [{
                        "value": "",
                        "msg": "huvo un error interno del servidor",
                        "param": "",
                        "location": ""}]
                },
                data: {}
            });
            next(e);
        }
    },

    remove: async (req, res, next) => {
        const getId = req.params.id;
        try {
            const reg = await models.Offer.findByIdAndDelete({ _id: getId });
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: [{
                        "value": "",
                        "msg": "huvo un error interno del servidor",
                        "param": "",
                        "location": ""}]
                },
                data: {}
            });
            next(e);
        }
    }

}