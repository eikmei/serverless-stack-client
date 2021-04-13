import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { BsCheck, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./ResetPassword.css";
import { Button, InputGroup } from "react-bootstrap";

export default function ResetPassword() {
	const [fields, handleFieldChange] = useFormFields({
		code: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [codeSent, setCodeSent] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	const [isConfirming, setIsConfirming] = useState(false);
	const [isSendingCode, setIsSendingCode] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

	function validateCodeForm() {
		return fields.email.length > 0;
	}

	function validateResetForm() {
		return (
			fields.code.length > 0 &&
			fields.password.length > 0 &&
			fields.password === fields.confirmPassword
		);
	}

	async function handleSendCodeClick(event) {
		event.preventDefault();

		setIsSendingCode(true);

		try {
			await Auth.forgotPassword(fields.email);
			setCodeSent(true);
		} catch (error) {
			onError(error);
			setIsSendingCode(false);
		}
	}

	async function handleConfirmClick(event) {
		event.preventDefault();

		setIsConfirming(true);

		try {
			await Auth.forgotPasswordSubmit(
				fields.email,
				fields.code,
				fields.password
			);
			setConfirmed(true);
		} catch (error) {
			onError(error);
			setIsConfirming(false);
		}
	}

	const togglePasswordVisibility = () => {
		setPasswordShown(passwordShown ? false : true);
	}

	const toggleConfirmPasswordVisibility = () => {
		setConfirmPasswordShown(confirmPasswordShown ? false : true);
	}

	function renderRequestCodeForm() {
		return (
			<form onSubmit={handleSendCodeClick}>
				<Form.Group bsSize="large" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<LoaderButton
					block
					type="submit"
					bsSize="large"
					isLoading={isSendingCode}
					disabled={!validateCodeForm()}
				>
					Send Confirmation
				</LoaderButton>
			</form>
		);
	}

	function renderConfirmationForm() {
		return (
			<form onSubmit={handleConfirmClick}>
				<Form.Group bsSize="large" controlId="code">
					<Form.Label>Confirmation Code</Form.Label>
					<Form.Control
						autoFocus
						type="tel"
						value={fields.code}
						onChange={handleFieldChange}
					/>
					<Form.Text>
						Please check your email ({fields.email}) for the
						confirmation code.
					</Form.Text>
				</Form.Group>
				<hr />
				<Form.Group bsSize="large" controlId="password">
					<Form.Label>New Password</Form.Label>
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
				<Form.Group bsSize="large" controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							type={confirmPasswordShown ? "text" : "password"}
							value={fields.confirmPassword}
							onChange={handleFieldChange}
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
					type="submit"
					bsSize="large"
					isLoading={isConfirming}
					disabled={!validateResetForm()}
				>
					Confirm
				</LoaderButton>
			</form>
		);
	}

	function renderSuccessMessage() {
		return (
			<div className="success">
				<BsCheck size={17} />
				<p>Your password has been reset.</p>
				<p>
					<Link to="/login">
						Click here to login with your new credentials.
					</Link>
				</p>
			</div>
		);
	}

	return (
		<div className="ResetPassword">
			{!codeSent
				? renderRequestCodeForm()
				: !confirmed
				? renderConfirmationForm()
				: renderSuccessMessage()}
		</div>
	);
}
