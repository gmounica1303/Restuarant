const chai = require('chai');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expect = chai.expect;
app.set('views',path.join(__dirname,'app.js'))
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const notes = [{
    noteId: 1,
    noteContent: "Hey guys, add your important notes here."
}];

app.get("/", (req, res) => {
    res.render("home", {
        data: notes
    });
});

    describe('GET /', function () {
        it('should return 200 OK and render home view', function (done) {
            request(app)
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

  