import {parseExpression} from './Expression' ;


let rows=[];

function identifier_getname(identifier) {
    //if(identifier == null) return null;
    return identifier.name;
}





function FunctionDeclaration(code) {
    rows.push({'Line' : code.loc.start.line, 'Type': 'function declaration' ,'Name': identifier_getname(code.id),'Condition' : '','Value': ''});
    code.params.map((p) => {
        rows.push({'Line' : p.loc.start.line, 'Type': 'variable declaration' ,'Name': p.name,'Condition' : '','Value': ''});
    });

    code.body.body.map((p)=>{
        parse_elements(p);
    });
}

function  VariableDeclaration(code) {

    code.declarations.map( (p)=>{
        rows.push({'Line' : p.loc.start.line, 'Type': 'variable declaration' ,'Name': identifier_getname(p.id),'Condition' : '','Value': parseExpression(p.init,null)});
    });

}

function ExpressionStatement(code) {
    return parseExpression(code.expression,rows);
}
function WhileStatement(code) {
    rows.push({'Line' : code.loc.start.line, 'Type': 'while statement' ,'Name': '','Condition' : parseExpression(code.test) ,'Value': ''});
    code.body.body.map((p) => {
        parse_elements(p);
    });
}
function IfStatement(code) {
    rows.push({'Line' : code.loc.start.line, 'Type': 'if statement' ,'Name': '','Condition' : parseExpression(code.test).toString(),'Value': ''});
    parse_elements(code.consequent);
    if(code.alternate != null) {
        parse_elements(code.alternate);
    }

}
function ReturnStatement(code) {
    rows.push({'Line' : code.loc.start.line, 'Type': 'return statement' ,'Name': '','Condition' : parseExpression(code.test,null) ,'Value': parseExpression(code.argument,null)});
}
function ForStatement(code) {


    rows.push({'Line' : code.loc.start.line, 'Type': 'for statement' ,'Name': '','Condition' :  parseExpression(code.test,null)   ,'Value': ''});

    if(isVariableDeclaration(code.init))  VariableDeclaration(code.init);
    else   parseExpression(code.init,rows);
    parseExpression(code.update,rows);


    code.body.body.map((p) =>{
        parse_elements(p);
    });

}

function DoWhileStatement(code) {
    rows.push({'Line' : code.loc.start.line, 'Type': 'Do While Statement' ,'Name': '','Condition' : parseExpression(code.test) ,'Value': ''});
    code.body.body.map((p) => {
        parse_elements(p);
    });

}


/*######################  is Ture False ###################### */




function isVariableDeclaration(code) {
    return code.type === 'VariableDeclaration';

}

function  start(codejson) {
    rows=[];
    codejson.body.map((p) => {
        parse_elements(p);
    });
    return rows;

}

let dict = {
    'FunctionDeclaration': FunctionDeclaration ,
    'VariableDeclaration': VariableDeclaration ,
    'WhileStatement' :WhileStatement,
    'ExpressionStatement' :ExpressionStatement,
    'IfStatement' :IfStatement,
    'ReturnStatement' :ReturnStatement,
    'ForStatement' :ForStatement,
    'DoWhileStatement' : DoWhileStatement,

};

function parse_elements(codejson) {
    dict[codejson.type](codejson) ;
}

export {start} ;