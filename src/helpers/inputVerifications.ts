

const InputVerifications = {
  EmailVerification (email: string):boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default InputVerifications