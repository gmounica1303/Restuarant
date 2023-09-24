const chai = require('chai');
const chaihttp = require('chai-http');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const server= require("../services/web-server");
const apitest= require('../router/api/getdata.router');
const app = express();
const expect = chai.expect;
chai.use(chaihttp);

    describe('GET / apitest', function () {
        var url="http://localhost:3037/Menu";
        it('should return 200 OK and render home view',function() {
            request(url, function(error, response) {
                expect(response.statusCode).to.equal(200);
                });
        });
    });

  