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


}


const test = async () => {
    const repo = new UsersRepository('users.json');
    
    // const user = await repo.getOne('ac27d176');

    await repo.delete("e33ae98d");

    const users = await repo.getAll();

    console.log(users);
}

test();
