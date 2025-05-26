import { Alert, AlertTitle } from '@/components/ui/alert';
type redirectProps = {
  redirectTime: number;
}
export default function SaveArticleAlert({ redirectTime }: redirectProps) {
  return (
    <Alert className="bg-violet-300 border-none rounded shadow font-bold">
      <AlertTitle>
        Artlce Saved successfully! redirecting the page in {redirectTime} sec...{' '}
      </AlertTitle>
    </Alert>
  );
}
