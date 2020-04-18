const fs = require('fs');
const crypto = require('crypto');

class UsersRepository{
    constructor(filename){
        if (!filename){
            throw new Error('Creating a repository requires a filename');
        }
            this.filename = filename;

            try{
                fs.accessSync(this.filename);
            }catch(err){
                fs.writeFileSync(this.filename, '[]');
            }

        
    }

    async getAll(){
        // Open the file called this.filename
        const contents = await fs.promises.readFile(this.filename, {encoding: 'utf8'});

        // Read its contents

        //parse the contents
        const data = JSON.parse(contents);

        // Return the parsed date
        return data;

    }

    async create (attrs){
        attrs.id = this.randomId();

        const records = await this.getAll();
        records.push(attrs);

        await this.writeAll(records);

        // await fs.promises.writeFile(this.filename, JSON.stringify(records));

    }


    async writeAll(records){
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomId(){
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id){
        const records = await this.getAll();
        return records.find(record => record.id === id );
    }

    async delete(id){
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);

        // is this really the best way?
        // Read all the records from Database then rewrite all the records which not match the id, back to the Database.
        // So this means we have to read and write all data everytime we delete a record.
        await this.writeAll(filteredRecords);
    }

    async update(id, attrs){
        const records = await this.getAll();
        // const record = await this.getOne(id);
        const record = records.find(record => record.id ===id);


        if (!record){
            throw new Error(` update doesn't find ${id} not find `);
        }
        
        Object.assign(record, attrs);
        await this.writeAll(records);
        
        
    }

    async getOneBy(filters){
        const records = await this.getAll();
        // loop objects of the array
        for (let record of records){
            let found = true;
                // loop attributs in inside the object 
                for (let key in filters){
                    if (record[key] !== filters[key]){
                        found = false;
                        break;
                    }
                }

                if (found){
                    return record
                }

        }


    }


}


const test = async () => {
    const repo = new UsersRepository('users.json');
    
    // const user = await repo.getOne('ac27d176');

    // await repo.update("c43a50bb", {password: '123456'});

    //repo.create({email: 'test01', password: '123456789'});

    // const users = await repo.getAll();

    // console.log(users);

    const user = await repo.getOneBy({email: "test02", password: "123456"})
    console.log(user);

}

test();
