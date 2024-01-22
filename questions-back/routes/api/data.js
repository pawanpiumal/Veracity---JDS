const express = require('express');
const router = express.Router();

const config = require('../../config/keys')
const nthline = require('nthline')
const fs = require('fs')

var csv = require("csvtojson");

const pathForData = config.filePath

router.get('/', async (req, res) => {

    var data = []
    await csv()
        .fromFile(config.csvPath)
        .then((res) => {
            data = res
        })
    res.status(200).json({ data })

})

router.get('/file', async (req, res) => {
    var start = req.query.start ? req.query.start : 1
    var number = req.query.number ? req.query.number : 10
    if (number < 1) {
        res.status(400).json({ msg: "Number need to be greater than 0." })
    } else if (number > 100) {
        res.status(400).json({ msg: "Number need to be lower than or equal to 100." })
    } else if (start < 1) {
        res.status(400).json({ msg: "Start needs to be greater than 0." })
    } else {
        start = parseInt(start)
        number = parseInt(number)

        const jsonArray = [];
        for (let index = start - 1; index < start - 1 + number; index++) {
            const rowNumber = index
            await nthline(rowNumber, pathForData)
                .then(line => {
                    var item = JSON.parse(line)
                    var array = []
                    item.annotations.forEach(e => {
                        if (e.short_answers != "" && e.short_answers[0].start_token != -1 && e.short_answers[0].end_token != -1) {
                            e.short_answers.forEach(ele => {
                                let stringArr = []
                                for (let index = ele.start_token; index < ele.end_token; index++) {
                                    stringArr.push(item.document_tokens[index].token);
                                }
                                array.push(stringArr.join(" "))
                            })
                        }
                    })

                    var newItem = {
                        'document_title': item.document_title,
                        'question_text': item.question_text,
                        // 'annotations': item.annotations,
                        // 'document_tokens': item.document_tokens,
                        'short_answers': array,
                        'yes_no_answer': item.annotations.map(e => e.yes_no_answer)
                    }
                    jsonArray.push(newItem);
                }).catch(err => {
                    // console.error(err);
                })
        }

        // for (let index = 816; index < 838; index++) {
        //     console.log(jsonArray[0].document_tokens[index].token);

        // }
        // console.log(jsonArray[0].document_tokens[816]);
        res.status(200).json({ jsonArray })
    }
})

module.exports = router;