import { EntityRepository, Repository } from "typeorm";
import { Contacts } from "./contacts.entity";

@EntityRepository(Contacts)
export class ContactsRepositry extends Repository<Contacts>{
    
}