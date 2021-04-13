import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";
import { Button, InputGroup } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function Signup() {
	const [fields, handleFieldChange] = useFormFields({
		email: "",
		password: "",
		confirmPassword: "",
		confirmationCode: "",
	});
	const history = useHistory();
	const [newUser, setNewUser] = useState(null);
	const { userHasAuthenticated } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

	function validateForm() {
		return (
			fields.email.length > 0 &&
			fields.password.length > 0 &&
			fields.password === fields.confirmPassword
		);
	}

	function validateConfirmationForm() {
		return fields.confirmationCode.length > 0;
	}

	const togglePasswordVisibility = () => {
		setPasswordShown(passwordShown ? false : true);
	}

	const toggleConfirmPasswordVisibility = () => {
		setConfirmPasswordShown(confirmPasswordShown ? false : true);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setIsLoading(true);

		try {
			const newUser = await Auth.signUp({
				username: fields.email,
				password: fields.password,
			});
			setIsLoading(false);
			setNewUser(newUser);
		} catch (e) {
			console.log(e);
			// if (e === "UsernameExistsException") {
			//     await Auth.resendSignUp({
			//         username: fields.email
			//     });
			// } else {
			onError(e);
			// }
			setIsLoading(false);
		}
	}

	async function handleConfirmationSubmit(event) {
		event.preventDefault();

		setIsLoading(true);

		try {
			await Auth.confirmSignUp(fields.email, fields.confirmationCode);
			await Auth.signIn(fields.email, fields.password);

			userHasAuthenticated(true);
			history.push("/");
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	}

	function renderConfirmationForm() {
		return (
			<Form onSubmit={handleConfirmationSubmit}>
				<Form.Group controlId="confirmationCode" size="lg">
					<Form.Label>Confirmation Code</Form.Label>
					<Form.Control
						autoFocus
						type="tel"
						onChange={handleFieldChange}
						value={fields.confirmationCode}
					/>
					<Form.Text muted>
						Please check your email for the code.
					</Form.Text>
				</Form.Group>
				<LoaderButton
					block
					size="lg"
					type="submit"
					variant="success"
					isLoading={isLoading}
					disabled={!validateConfirmationForm()}
				>
					Verify
				</LoaderButton>
			</Form>
		);
	}

	function renderForm() {
		return (
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email" size="lg">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="password" size="lg">
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
				<Form.Group controlId="confirmPassword" size="lg">
					<Form.Label>Confirm Password</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							type={confirmPasswordShown ? "text" : "password"}
							onChange={handleFieldChange}
							value={fields.confirmPassword}
						/>
						<InputGroup.Append>
      						<Button>
								{!confirmPasswordShown ? (
									<BsFillEyeSlashFill onClick={toggleConfirmPasswordVisibility}/>
								) : (
									<BsFillEyeFill onClick={toggleConfirmPasswordVisibility} />
								)}
							</Button>
    					</InputGroup.Append>
					</InputGroup>
				</Form.Group>
				<LoaderButton
					block
					size="lg"
					type="submit"
					variant="success"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Signup
				</LoaderButton>
			</Form>
		);
	}

	return (
		<div className="Signup">
			{newUser === null ? renderForm() : renderConfirmationForm()}
		</div>
	);
}
