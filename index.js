const csv = require('csvtojson')


async function readSheet() {
    const redsheet = await csv().fromFile('./data.csv');
    console.log(redsheet);
} 

var a = {
    type: 'selection',
    arguments: {
        from: {
            type: 'csv',
            value: 'data.csv'
        },
        parameters: ['ID', 'Department'],
        where: [
            {parameter: 'ID', comparision: 'greater', value:1}
        ]
    }
};

var b = {
    type: 'selection',
    arguments: {
        from: {
            type: 'data',
            value: []
        },
        parameters : ['Department'],
        
    }
}






function process(input) {
    var inpArr = input.split(' ')
    // TODO
    return {
        type: 'selection',
        arguments: {
            from: {
                type: 'csv',
                value: 'data.csv'
            },
            parameters: ['ID', 'Department'],
            where: [
                {parameter: 'ID', comparision: 'greater', value:1}
            ]
        }
    };
}

function query(input) {
    const processed = await process(input)
    if(processsed.type === 'selection') {
        return select(processed);
    }
}

async function main() {
    b.arguments.from = await select(a);
    console.log(b);
    console.log(await select(b));
}


main();

exports.query = query;