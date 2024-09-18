import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerUser} from '../services/authService';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError]= useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('No coinciden las contraseñas');
            return;
        }

        try{
            setLoading(true);
            await registerUser(formData.username, formData.email, formData.password);
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Error al registrar usuario');
        }
    };

    return(
        <div className='register-form'>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />   
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />   
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="confirmPassword"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />   
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Registrandose...' : 'Registro'}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;