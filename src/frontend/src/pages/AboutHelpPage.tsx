import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Info, Mail } from 'lucide-react';

export default function AboutHelpPage() {
  const faqs = [
    {
      question: 'How do I create a listing?',
      answer: 'Sign in using the Login button, then navigate to "Create Listing" from the menu. Fill in all the required details about your product and submit the form.',
    },
    {
      question: 'How can buyers contact me?',
      answer: 'When creating a listing, you can add your contact information in the optional contact field. This will be displayed to potential buyers viewing your listing.',
    },
    {
      question: 'Can I edit my listings?',
      answer: 'Yes! Go to "My Listings" to view all your listings. You can edit or deactivate any of your listings from there.',
    },
    {
      question: 'How do I search for specific products?',
      answer: 'Use the search bar and filters on the Browse Listings page to find products by keyword, category, or sort by price.',
    },
    {
      question: 'Is there a fee to use Kisan Kart?',
      answer: 'Kisan Kart is currently free to use for all farmers and buyers. You can create and browse listings without any charges.',
    },
  ];

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About & Help</h1>
          <p className="text-muted-foreground">
            Learn more about Kisan Kart and find answers to common questions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About Kisan Kart
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Kisan Kart is a marketplace platform designed to connect farmers directly with buyers. 
              Our mission is to empower farmers by providing them with a simple, accessible platform 
              to list their products and reach a wider customer base.
            </p>
            <p className="text-muted-foreground">
              Whether you're a farmer looking to sell your produce or a buyer searching for fresh, 
              local products, Kisan Kart makes it easy to connect and transact with transparency and trust.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions about using Kisan Kart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have additional questions or need support, please reach out to our community 
              or check back for updates. We're continuously working to improve Kisan Kart and 
              make it more useful for farmers and buyers alike.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
