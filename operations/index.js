
var a = {
    type: 'selection',
    arguments: {
        from: {
            type: 'csv',
            value: 'data.csv'
        },
        parameters: ['ID', 'Department'],
        where: [
            {
                type: 'operation',
                val1: {type: 'param', value:'ID'},
                val2: {type: 'operation', val1: 1, val2: 2, operation: '+'},
                operation: '>'    
            }
        ]
    }
};

function parseOperation(operation, row){
    console.log(operation);
    if(operation.type == 'param'){
        return {
            type: 'number',
            value: row[operation.value]
        };
    }
    if(operation.type == 'number'){
        return operation;
    }
    if(operation.type == 'operation'){
        if(operation.operation == '+')
            console.log(parseOperation(operation.val1, row))
            return {
                type: 'number',
                value: parseOperation(operation.val1, row).value + parseOperation(operation.val2, row).value
            }
        if(operation.operation == '>')
            return {
                type: 'boolean',
                value: parseOperation(operation.val1, row).value > parseOperation(operation.val2, row).value
            }
    }
}

a.arguments.where.map((e) => {
    console.log(parseOperation(e, {ID: 4, Name: 'Jane Doe'}));
})

function filterResults(where, results) {
    //TODO...
    where.map((check) => {

    });
}

async function select(q) {
    var redsheet;
    if(q.arguments.from.type === 'csv'){
        redsheet = await csv().fromFile(`./${q.arguments.from.value}`);
    }
    else {
        redsheet = q.arguments.from.value;
    }
    const ret = redsheet.map((e) => {
        var temp = {}
        q.arguments.parameters.map((i) => temp[i] = e[i]);
        return temp;
    })

    return {
        type: 'data',
        value: ret
    };
}




exports.select = select;