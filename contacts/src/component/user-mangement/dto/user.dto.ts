import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    mobileNum: string;

    @IsNotEmpty()
    @IsString()
    country: string;


    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsString()
    fingerPrint: string;


    @IsNotEmpty()
    @IsString()
    uHeader: string;

}



export class UserExistDto {
    @IsNotEmpty()
    @IsString()
    mobileNum: string;


    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @IsNotEmpty()
    @IsString()
    fingerPrint: string;

    @IsNotEmpty()
    @IsString()
    uHeader: string;
}


export class LoginDto{
    @IsNotEmpty()
    @IsString()
    mobileNum: string;


    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    fingerPrint: string;

    @IsNotEmpty()
    @IsString()
    uHeader: string;
}


export class LogoutDto{
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    fingerPrint: string;

    @IsNotEmpty()
    @IsString()
    uHeader: string;
}
export class AddDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @IsNotEmpty()
    @IsString()
    mobile: string;
    
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    fingerPrint: string;

    @IsNotEmpty()
    @IsString()
    uHeader: string;
}
export class DeleteDto{
    @IsNotEmpty()
    @IsString()
    contactId: string;

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    fingerPrint: string;

    @IsNotEmpty()
    @IsString()
    uHeader: string;
}
export class ListDto{
    
    @IsNotEmpty()
    @IsString()
    pageNum: string;

    @IsOptional()
    @IsString()
    data: string;

    @IsOptional()
    @IsString()
    userId: string;
    
    @IsNotEmpty()
    @IsString()
    fingerPrint: string;

    @IsNotEmpty()
    @IsString()
    uHeader: string;
}
export class EditDto{
    
    @IsString()
    firstName: string;
    
    @IsString()
    contactId: string;

    @IsString()
    lastName: string;
    
    @IsString()
    mobile: string;
    
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    token: string;
    
    @IsNotEmpty()
    @IsString()
    fingerPrint: string;

    @IsNotEmpty()
    @IsString()
    uHeader: string;
}