class Lexer {
    constructor(input, filename = '<anonymous>') {
        this.input = input;
        this.filename = filename;
        this.pos = 0;
        this.line = 1;
        this.col = 1;
        this.currentChar = this.input[this.pos] || null;
    }

    advance() {
        if (this.currentChar === '\n') {
            this.line++;
            this.col = 1;
        } else {
            this.col++;
        }
        this.pos++;
        this.currentChar = this.input[this.pos] || null;
    }

    peek() {
        const peekPos = this.pos + 1;
        return peekPos < this.input.length ? this.input[peekPos] : null;
    }

    skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    skipComment() {
        while (this.currentChar !== null && this.currentChar !== '\n') {
            this.advance();
        }
    }

    number() {
        let result = '';
        let startCol = this.col;
        let startLine = this.line;
        let hasDecimal = false;

        while (this.currentChar !== null && (/[0-9]/.test(this.currentChar) || (this.currentChar === '.' && !hasDecimal))) {
            if (this.currentChar === '.') {
                hasDecimal = true;
            }
            result += this.currentChar;
            this.advance();
        }

        return {
            type: 'NUMBER',
            value: Number(result),
            line: startLine,
            col: startCol,
            filename: this.filename
        };
    }

    identifierOrKeyword() {
        let result = '';
        let startCol = this.col;
        let startLine = this.line;

        while (this.currentChar !== null && /[a-zA-Z0-9_]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        const keywords = ['let', 'say', 'ask', 'if', 'otherwise', 'repeat', 'each', 'in', 'make', 'give', 'true', 'false'];
        const type = keywords.includes(result) ? result.toUpperCase() : 'IDENTIFIER';

        return {
            type,
            value: result,
            line: startLine,
            col: startCol,
            filename: this.filename
        };
    }

    string(quoteChar) {
        let result = '';
        let startCol = this.col;
        let startLine = this.line;
        this.advance();

        while (this.currentChar !== null && this.currentChar !== quoteChar) {
            if (this.currentChar === '\\') {
                this.advance();
                if (this.currentChar === 'n') result += '\n';
                else if (this.currentChar === 't') result += '\t';
                else result += this.currentChar;
            } else {
                result += this.currentChar;
            }
            this.advance();
        }

        if (this.currentChar === quoteChar) {
            this.advance();
        } else {
            throw new Error(`Unterminated string at line ${startLine}, col ${startCol} in ${this.filename}`);
        }

        return {
            type: 'STRING',
            value: result,
            line: startLine,
            col: startCol,
            filename: this.filename
        };
    }

    tokenize() {
        const tokens = [];

        while (this.currentChar !== null) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (this.currentChar === '/' && this.peek() === '/') {
                this.skipComment();
                continue;
            }

            if (/[0-9]/.test(this.currentChar)) {
                tokens.push(this.number());
                continue;
            }

            if (/[a-zA-Z_]/.test(this.currentChar)) {
                tokens.push(this.identifierOrKeyword());
                continue;
            }

            if (this.currentChar === '"' || this.currentChar === "'") {
                tokens.push(this.string(this.currentChar));
                continue;
            }

            let startLine = this.line;
            let startCol = this.col;

            if (this.currentChar === '=' && this.peek() === '=') {
                this.advance();
                this.advance();
                tokens.push({ type: 'EQ', value: '==', line: startLine, col: startCol, filename: this.filename });
                continue;
            }

            if (this.currentChar === '!' && this.peek() === '=') {
                this.advance();
                this.advance();
                tokens.push({ type: 'NEQ', value: '!=', line: startLine, col: startCol, filename: this.filename });
                continue;
            }

            if (this.currentChar === '<' && this.peek() === '=') {
                this.advance();
                this.advance();
                tokens.push({ type: 'LTE', value: '<=', line: startLine, col: startCol, filename: this.filename });
                continue;
            }

            if (this.currentChar === '>' && this.peek() === '=') {
                this.advance();
                this.advance();
                tokens.push({ type: 'GTE', value: '>=', line: startLine, col: startCol, filename: this.filename });
                continue;
            }

            const singleChars = {
                '+': 'PLUS',
                '-': 'MINUS',
                '*': 'MULTIPLY',
                '/': 'DIVIDE',
                '=': 'ASSIGN',
                ':': 'COLON',
                '(': 'LPAREN',
                ')': 'RPAREN',
                '{': 'LBRACE',
                '}': 'RBRACE',
                '[': 'LBRACKET',
                ']': 'RBRACKET',
                ',': 'COMMA',
                '.': 'DOT',
                '<': 'LT',
                '>': 'GT'
            };

            if (singleChars[this.currentChar]) {
                const type = singleChars[this.currentChar];
                const value = this.currentChar;
                this.advance();
                tokens.push({ type, value, line: startLine, col: startCol, filename: this.filename });
                continue;
            }

            throw new Error(`Unexpected character '${this.currentChar}' at line ${this.line}, col ${this.col} in ${this.filename}`);
        }

        tokens.push({ type: 'EOF', value: null, line: this.line, col: this.col, filename: this.filename });
        return tokens;
    }
}

export default Lexer;

