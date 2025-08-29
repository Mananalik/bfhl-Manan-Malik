import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Input data must be an array." });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_chars = '';


        data.forEach(item => {
            if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {

                alphabets.push(item.toUpperCase());
                alphabet_chars += item;
            } else if (!isNaN(parseFloat(item)) && isFinite(item)) {

                
                const num = Number(item);
                if (num % 2 === 0) {
                    even_numbers.push(String(num));
                } else {
                    odd_numbers.push(String(num));
                }
                sum += num;
            } else if (typeof item === 'string') {
                
                
                if (/^[a-zA-Z]+$/.test(item)) {
                    alphabets.push(item.toUpperCase());
                    alphabet_chars += item;
                } else {
                    special_characters.push(item);
                }
            }
        });


        let concat_string = '';
        const reversed_alphabets = alphabet_chars.split('').reverse().join('');
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }


        const user_data = {
            is_success: true,
            user_id: "jane_doe_29082025", 
            email: "jane.doe@example.com",
            roll_number: "JD12345",
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string
        };

        res.status(200).json(user_data);

    } catch (error) {

        console.error("Error processing request:", error);
        res.status(500).json({ is_success: false, error: "An internal server error occurred." });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});