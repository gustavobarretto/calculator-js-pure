'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[class*=tecla]')
const operadores = document.querySelectorAll('[class=operador]')

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if(operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;

        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`).toString().replace('.', ',');
        atualizarDisplay(resultado);
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto;
    }    
}


const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if(!novoNumero) {
        calcular()
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.querySelector('[class=resultado]').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1)
}

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if(!existeDecimal()) {
        if(existeValor()) {
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0,')
        }
    }
}

document.querySelector('[class=limparDisplay]').addEventListener('click', limparDisplay)
document.querySelector('[class=limparCalculo]').addEventListener('click', limparCalculo)
document.querySelector('[class=backspace]').addEventListener('click', removerUltimoNumero)
document.querySelector('[class=inverter]').addEventListener('click', inverterSinal)
document.querySelector('[class=decimal]').addEventListener('click', inserirDecimal)

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/' : 'dividir',
    '*' : 'multiplicar',
    '-' : 'subtrair',
    '+' : 'somar',
    'Enter' : 'resultado',
    'Backspace' : 'backspace',
}

const mapearTeclado = (evento) => {
    const tecla = evento.key
    const classe = mapaTeclado[tecla]
    console.log(classe)
    
    document.querySelector(`[class*=${classe}]`).click();
    
}

document.addEventListener('keydown', mapearTeclado);