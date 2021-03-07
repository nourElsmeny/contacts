import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { HelperService } from '../../config/helper/helper.service';
import { Devices } from '../../config/schemas/devices/devices.entity';
import { AddDto, DeleteDto, EditDto, ListDto, LoginDto, LogoutDto, SignupDto, UserExistDto } from './dto/user.dto';
import { Users } from '../../config/schemas/user/user.entity';
import { DevicesRepositry } from 'src/config/schemas/devices/devices.repositry';
import { UserRepositry } from 'src/config/schemas/user/user.repositry';
import { ContactsRepositry } from 'src/config/schemas/contacts/contacts.repositry';
import { Contacts } from 'src/config/schemas/contacts/contacts.entity';
import { Like, In } from 'typeorm';

@Injectable()
export class UserService {
    constructor(private helperService: HelperService,
        @InjectRepository(DevicesRepositry)
        private deviceRepositry: DevicesRepositry,
        @InjectRepository(UserRepositry)
        private userRepositry: UserRepositry,
        @InjectRepository(ContactsRepositry)
        private contactsRepositry: ContactsRepositry,
    ) { }

    async userExist(userExistDto: UserExistDto): Promise<any> {
        const user = await this.userRepositry.findOne({
            countryCode: userExistDto.countryCode,
            mobileNumber: userExistDto.mobileNum,
        });
        return new HttpException(
            { exist: !!user },
            HttpStatus.OK,
        );
    }

    async signup(signupdto: SignupDto): Promise<any> {

        let Password = await this.helperService.generateHash(
            signupdto.password,
        );

        const user = await this.userRepositry.findOne({
            mobileNumber: signupdto.mobileNum,
        });
        if (user) {
            throw new HttpException(
                'this mobile number alredy have an account',
                HttpStatus.BAD_REQUEST,
            );
        }

        const userId: string = uuidv4();
        const deviceToken: string = uuidv4();
        let fingerprint = await this.helperService.generateHash(signupdto.fingerPrint);
        const userToken = await this.helperService.CriptoData({
            userId: userId,
            date: new Date(),
            fingerPrint: fingerprint,
        });
        const userData = new Users();
        userData.username = signupdto.username;
        userData.password = Password;
        userData.userId = userId;
        userData.firstName = "";
        userData.lastName = "";
        userData.image = "";
        userData.country = signupdto.country;
        userData.mobileNumber = signupdto.mobileNum;
        userData.countryCode = signupdto.countryCode;
        userData.address = "";
        userData.location = "";
        userData.role = signupdto.role;
        userData.gender = "";
        userData.pirthDate = "";
        userData.email = "";
        userData.emailVirefy = false;
        userData.mobileViryfy = false;
        userData.isActive = false;
        userData.isDeleted = false;
        userData.isLogin = true;
        userData.isBlocked = false;
        userData.userToken = userToken;
        userData.oldPassword = '{}';


        const deviceData = new Devices();
        deviceData.deviceId = fingerprint
        deviceData.userId = userId;
        deviceData.detail = signupdto.uHeader;
        deviceData.isActive = true;
        deviceData.isDeleted = false;
        deviceData.isBlocked = false;


        const userRes = await this.userRepositry.save(userData);
        if (!userRes) {
            throw new HttpException(
                'Error in create user',
                HttpStatus.BAD_REQUEST,
            );
        }

        const deviceRes = await this.deviceRepositry.save(deviceData);

        if (!deviceRes) {
            throw new HttpException(
                'Cannot recognized this Device',
                HttpStatus.BAD_REQUEST,
            );
        }

        return new HttpException({ token: userRes.userToken }, HttpStatus.OK);


    }

    async login(logindto: LoginDto): Promise<any> {
        // hashing the input password ----------------------
        let Password = await this.helperService.generateHash(
            logindto.password,
        );

        // get user information for input monbile number --------
        const user = await this.userRepositry.findOne({
            mobileNumber: logindto.mobileNum,
            countryCode: logindto.countryCode
        });

        // check if user is exist --------------------------------
        if (!user) {
            throw new HttpException(
                'this mobile number not foud, please signup first',
                HttpStatus.BAD_REQUEST,
            );
        }

        const fingerPrint = await this.helperService.generateHash(logindto.fingerPrint);

        // check if from same device ------------------------------
        const deviceRes = await this.deviceRepositry.findOne({ userId: user.userId, deviceId: fingerPrint });

        let activeDevice = false;
        if (deviceRes) {
            activeDevice = deviceRes.isActive;
        }
        // if user aleary login and enter same password and from same device  -----
        if (user.isLogin && user.password == Password && activeDevice) {
            throw new HttpException({
                message: 'You are already loged in', token: user.userToken
            },
                HttpStatus.OK,
            );
        }


        const userToken = await this.helperService.CriptoData({
            userId: user.userId,
            date: new Date(),
            fingerPrint: fingerPrint,
        },
        );

        const deviceData = new Devices();
        deviceData.deviceId = fingerPrint
        deviceData.userId = user.userId;
        deviceData.detail = logindto.uHeader;
        deviceData.isActive = true;
        deviceData.isDeleted = false;
        deviceData.isBlocked = false;
        user.userToken = userToken
        const userUpdates = await this.userRepositry.save(user);
        if (!userUpdates) {
            throw new HttpException('Somthing went wrrong, Please try again',
                HttpStatus.BAD_REQUEST,
            );
        }

        let deviceUpdates: any;

        if (deviceRes && !activeDevice) {
            deviceUpdates = await this.deviceRepositry.update({ deviceId: deviceRes.deviceId }, { isActive: true });
        } else {
            deviceUpdates = await this.deviceRepositry.save(deviceData);
        }

        return new HttpException({ token: userUpdates.userToken }, HttpStatus.OK);
    }


    async logout(req, logoutDto: LogoutDto): Promise<any> {
        const userToken = await this.helperService.CriptoData({
            userId: req.me.userId,
            date: new Date(),
            fingerPrint: req.me.fingerprint,
        });
        const userRes = await this.userRepositry.update({
            userId: req.me.userId
        }, {
            isLogin: false,
            userToken: userToken
        });

        return new HttpException("Success", HttpStatus.OK);
    }

    async add(req, addDto: AddDto): Promise<any> {
        let contactData = new Contacts();
        contactData.firstName = addDto.firstName;
        contactData.lastName = addDto.lastName;
        contactData.mobileNumber = addDto.mobile;
        contactData.email = addDto.email;
        contactData.userId = req.me.userId;
        contactData.isDeleted = false;
        contactData.contactId = uuidv4();

        const contactCreate = await this.contactsRepositry.save(contactData);

        if (!contactCreate) {
            throw new HttpException(
                'Cannot create the contact Now, try later',
                HttpStatus.BAD_REQUEST,
            );
        }
        return new HttpException("Success", HttpStatus.OK);
    }

    async list(listDto: ListDto): Promise<any> {
        const contactData = listDto.data.length > 0 ?
            {
                $or: [
                    {
                        firstName: { $in: [listDto.data] }, isDeleted: false
                    },
                    {
                        lastName: { $in: [listDto.data] }, isDeleted: false
                    },
                    {
                        mobileNumber: { In: ([listDto.data]) }, isDeleted: false
                    },
                    {
                        email: { $in: [listDto.data] }, isDeleted: false
                    }
                ]
            }
                : {
                    isDeleted: false
        }
        const [result, total] = await this.contactsRepositry.findAndCount(
            {
                where: contactData,
                take: 10,
                skip: parseInt(listDto.pageNum)
            }
        );
        return new HttpException({ data: result, count: total }, HttpStatus.OK);
    }

    async delete(req, deleteDto: DeleteDto): Promise<any> {
        let contactData = new Contacts();
        contactData.contactId = deleteDto.contactId;
        contactData.userId = req.me.userId;
        contactData.isDeleted = true;
        const contact = await this.contactsRepositry.findOne({contactId : contactData.contactId,userId : req.me.userId})
        if (!contact) {
            throw new HttpException(
                'Cannot find this user',
                HttpStatus.BAD_REQUEST,
            );
        }

        contact.isDeleted = true;
        const contactCreate = await this.contactsRepositry.save(contact);
        // console.log(contactCreate);
        
        if (!contactCreate) {
            throw new HttpException(
                'Cannot create the contact Now, try later',
                HttpStatus.BAD_REQUEST,
            );
        }
        const contacts = await this.contactsRepositry.find({isDeleted:false})
        if (!contacts) {
            throw new HttpException(
                'Cannot find this user',
                HttpStatus.BAD_REQUEST,
            );
        }
        return new HttpException({data:contacts} , HttpStatus.OK);
    }
    async edit(req, editDto: EditDto): Promise<any> {
        let contactData = new Contacts();
        contactData.contactId = editDto.contactId;
        const contact = await this.contactsRepositry.findOne({contactId : contactData.contactId,userId : req.me.userId})
        if (!contact) {
            throw new HttpException(
                'Cannot find this user',
                HttpStatus.BAD_REQUEST,
            );
        }
        editDto.firstName ? contact.firstName = editDto.firstName : false;
        editDto.lastName ? contact.lastName = editDto.lastName : false;
        editDto.email ? contact.email = editDto.email : false;
        editDto.mobile ? contact.mobileNumber = editDto.mobile : false;
        const contactCreate = await this.contactsRepositry.save(contact);
        if (!contactCreate) {
            throw new HttpException(
                'Cannot create the contact Now, try later',
                HttpStatus.BAD_REQUEST,
            );
        }
        return new HttpException("Success", HttpStatus.OK);
    }

}
