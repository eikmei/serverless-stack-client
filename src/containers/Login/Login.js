import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./Login.css";

export default function Login() {
	const { userHasAuthenticated } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);
	const [fields, handleFieldChange] = useFormFields({
		email: "",
		password: "",
	});
	const [passwordShown, setPasswordShown] = useState(false);

	function validateForm() {
		return fields.email.length > 0 && fields.password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setIsLoading(true);

		try {
			await Auth.signIn(fields.email, fields.password);
			userHasAuthenticated(true);
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	}

	const togglePasswordVisibility = () => {
		setPasswordShown(passwordShown ? false : true);
	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<InputGroup className="mb-3">
    					<Form.Control
							type={passwordShown ? "text" : "password"}
							value={fields.password}
							onChange={handleFieldChange}
						/>
    					<InputGroup.Append>
      						<Button>
								{!passwordShown ? (
									<BsFillEyeSlashFill onClick={togglePasswordVisibility}/>
								) : (
									<BsFillEyeFill onClick={togglePasswordVisibility} />
								)}
							</Button>
    					</InputGroup.Append>
  					</InputGroup>
				</Form.Group>
				<Link to="/login/reset">Forgot password?</Link>
				<LoaderButton
					block
					size="lg"
					type="submit"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Login
				</LoaderButton>
			</Form>
		</div>
	);
}
