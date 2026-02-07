import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { LogIn } from 'lucide-react';

export default function SignInPrompt() {
  const { login, loginStatus } = useInternetIdentity();

  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access this feature. You'll be able to create and manage your listings once authenticated.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button 
              onClick={login} 
              disabled={loginStatus === 'logging-in'}
              size="lg"
              className="gap-2"
            >
              <LogIn className="h-5 w-5" />
              {loginStatus === 'logging-in' ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
