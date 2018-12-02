
function  MemberExpression(code,lst) {
    if(lst!=null)
        lst.push({'Line' : code.loc.start.line, 'Type': 'Member Expression' ,'Name': parseExpression(code.object,null).toString()+'['+parseExpression(code.property,null).toString()+']' ,'Condition' : '','Value':  ''});

    return parseExpression(code.object,null).toString()+'['+parseExpression(code.property,null).toString()+']';

}
function BinaryExpression(code,lst) {
    let op = code.operator;
    let left = parseExpression(code.left);
    let right = parseExpression(code.right);

    if(lst!=null)
        lst.push({'Line' : code.loc.start.line, 'Type': 'Binary Expression' ,'Name': '' ,'Condition' : '','Value': left + op + right });
    return  left+op+right;
}

function Literal(code,lst) {
    if(lst!=null)
        lst.push({'Line' : code.loc.start.line, 'Type': 'Literal' ,'Name': '' ,'Condition' : '','Value': code.raw.toString() });
    return code.raw;
}

function AssignmentExpression(code,lst) {
    if(lst!=null)
        lst.push({'Line' : code.loc.start.line, 'Type': 'assignment expression' ,'Name': parseExpression(code.left,null),'Condition' : '','Value': parseExpression(code.right,null) });
    return parseExpression(code.left,null) + code.operator + parseExpression(code.right,null) ;
}
function Identifier(code,lst) {
    if(lst !=null)
        lst.push({'Line' : code.loc.start.line, 'Type': 'Identifier' ,'Name': '' ,'Condition' : '','Value': code.name });
    return code.name ;
}


function UnaryExpression(code , lst) {
    if(lst !=null)
        lst.push({'Line' : code.loc.start.line, 'Type': 'Unary Expression' ,'Name': '' ,'Condition' : '','Value': code.operator+ parseExpression(code.argument,null)  });
    return code.operator+ parseExpression(code.argument) ;
}
function UpdateExpression(code,lst) {
    let v= parseExpression(code.argument) +code.operator ;
    // if(lst != null)
    lst.push({'Line' : code.loc.start.line, 'Type': 'Update Expression' ,'Name': '' ,'Condition' : '','Value': v });
    return v;
}
function LogicalExpression(code,lst){

    let op = code.operator;
    let left = parseExpression(code.left);
    let right = parseExpression(code.right);

    if(lst!=null)
        lst.push({'Line' : code.loc.start.line, 'Type': 'Logical Expression' ,'Name': '' ,'Condition' : '','Value': left + op + right });
    return  left+op+right;
}

let dec = {
    'BinaryExpression' : BinaryExpression ,
    'Literal' : Literal ,
    'AssignmentExpression' : AssignmentExpression ,
    'Identifier' : Identifier ,
    'UnaryExpression' : UnaryExpression ,
    'UpdateExpression' : UpdateExpression ,
    'MemberExpression' :MemberExpression,
    'LogicalExpression':LogicalExpression
};

function  parseExpression(code,lst) {
    if (code== null)
        return '' ;
    if(dec[code.type] != undefined)
        return  dec[code.type](code,lst);
    return null;
    // }
    // else

}
export {parseExpression};