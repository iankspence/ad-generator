import { verifyEmail } from '../utils/api/mongo/user/verify-email/verifyEmailApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {
    const router = useRouter();
    const { emailVerificationToken } = router.query;

    const [verificationStatus, setVerificationStatus] = useState('verifying');

    useEffect(() => {
        if (!emailVerificationToken) return;

        (async () => {
            try {
                const data = await verifyEmail(emailVerificationToken);
                localStorage.setItem('userToken', data.token);
                setVerificationStatus('success');
            } catch (error) {
                console.error('Error:', error);
                setVerificationStatus('failed');
            }
        })();
    }, [emailVerificationToken]);

    useEffect(() => {
        if (verificationStatus === 'success') {
            router.push('/reviews').then((r) => console.log('Redirected to reviews'));
        }
    }, [verificationStatus, router]);

    return (
        <div>
            {verificationStatus === 'verifying' && (
                <div>
                    <h1>Verifying your email...</h1>
                </div>
            )}
            {verificationStatus === 'success' && (
                <div>
                    <h1>Email verification successful!</h1>
                    <p>Your email has been verified. You can now log in to your account.</p>
                </div>
            )}
            {verificationStatus === 'failed' && (
                <div>
                    <h1>Email verification failed</h1>
                    <p>There was an error verifying your email. Please try again or contact support.</p>
                </div>
            )}
        </div>
    );
}
