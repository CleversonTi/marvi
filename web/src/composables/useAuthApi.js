import axios from 'axios';
import { ref } from 'vue';

export function useAuthApi() {
    const token = ref(null);
    const error = ref(null);

    const loginValidade = async (username, password) => {
        try {
            const response = await axios.post('https://marvi.bisws.com.br/rest/V1/integration/admin/token', 
            {
                username,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            token.value = response.data;
            console.log('✅ Token Recebido:', token.value);
            return token.value;

        } catch (err) {
            error.value = err;
            console.error('❌ Erro ao autenticar:', error.value);
        }
    };

    return {
        token,
        error,
        loginValidade
    };
}
