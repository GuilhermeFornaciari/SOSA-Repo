import StudentClass from '../../src/entity/Class';
import Organization from '../../src/entity/Organization';
import mongoose, { mongo } from 'mongoose';
import { config } from 'dotenv';
config();

test('testar a classe Class.ts, métodos tradiconais', async () => {
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
        name: '2021 B TI',
        organizationId: idOrganization,
    }
    const Class = new StudentClass(input);
    expect(Class.name).toBe(input.name);
}, 15000);

test('Devete testar o post e o GetOne da classe Class.ts', async () => {
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
        name: '2021 B TI',
        organizationId: idOrganization,
    }
    const Class = new StudentClass(input);
    const ClassId = (await Class.Post())._id;
    const GetClass = await StudentClass.GetOne(ClassId);
    expect(GetClass.name).toBe(input.name);
    await mongoose.connection.close();  
}, 15000)

test('Deve testar o GetAll da classe Class.ts', async () => {
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
        name: '2022 B AGRO',
        organizationId: idOrganization,
    };
    const Class = new StudentClass(input);
    Class.Post();
    //primeiro input

    const input2 = {
        name: '2021 B AGROTEC',
        organizationId: idOrganization,
    };
    const Class1 = new StudentClass(input2);
    Class1.Post();

    const Classes = await StudentClass.GetAll();
    const ReturnClasses = Classes.find((Element) => Element.name == input.name);//buscar pelo mesmo nome dentro da lista retornada
    expect(ReturnClasses.name).toBe(input.name);
    const ReturnClasses1 = Classes.find((Element) => Element.name == input2.name);//buscar pelo mesmo nome dentro da lista retornada
    expect(ReturnClasses1.name).toBe(input2.name);
}, 15000)