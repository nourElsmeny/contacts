import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const { v4: uuid } = require('uuid');
const crypto = require('crypto');
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
const Key = "36d851f4-3e68-4919-b6f9-24d335b8761e";


// const iv = randomBytes(16);
const iv = '9e313bae8ffb4bcfaffb3f6a8a5592c1';
require('dotenv').config();
@Injectable()
export class HelperService {
    async generateHash(data) {
        const key = crypto.scryptSync(Key, 'salt', 16);
        const hash = crypto.createHash('sha256', key);
        hash.update(data);
        let hashedData = hash.digest('hex');
        return hashedData;
    };


    async CriptoData(data) {
        const key = (await promisify(scrypt)(data.fingerPrint + "" + data.userId + "" + Key, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));
        let input = JSON.stringify(data)
        const encryptedText = Buffer.concat([
            cipher.update(input),
            cipher.final(),
        ]);
        return encryptedText.toString("base64");
    };

    async Decrept(data) {
        let token =  Buffer.from(data.token, 'base64');
        const key = (await promisify(scrypt)(data.fingerPrint + "" + data.userId + "" + Key, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv(
            'aes-256-ctr',
            key,
            Buffer.from(iv, 'hex'));

        const decrpyted = Buffer.concat([
            decipher.update(Buffer.from(token)),
            decipher.final()
        ]);
        try {
            return JSON.parse(decrpyted.toString('utf8'));
        } catch (error) {
            return false;
        }
    }

    async clearUser(data) {
        const keys = ["password","userToken","oldPassword","createdAt","updatedAt"]
        for(let i in keys){
            delete data[keys[i]]
        }
        return data;
    }
}
