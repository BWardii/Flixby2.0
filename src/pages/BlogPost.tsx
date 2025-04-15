import React from 'react';
import SEO from '../components/SEO';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface BlogArticle {
  slug: string;
  title: string;
  publishDate: string;
  category: string;
  excerpt: string;
  content: {
    type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote';
    content: string | string[];
    level?: number;
  }[];
  author: {
    name: string;
    role: string;
    image: string;
  };
}

const blogArticles: BlogArticle[] = [
  {
    slug: 'what-is-ai-phone-receptionist',
    title: 'What is an AI Phone Receptionist? A Complete Guide for 2024',
    publishDate: 'January 15, 2024',
    category: 'AI Technology',
    excerpt: 'Discover how AI phone receptionists are transforming business communication in 2024 with advanced voice AI technology, cost savings, and improved customer experiences.',
    content: [
      {
        type: 'paragraph',
        content: 'In today\'s fast-paced business environment, efficient customer communication is more critical than ever. Enter the AI phone receptionist—a revolutionary technology that\'s changing how businesses handle calls and interact with customers.'
      },
      {
        type: 'heading',
        content: 'What is an AI Phone Receptionist?',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'An AI phone receptionist is a virtual assistant powered by artificial intelligence that handles incoming calls to your business. Unlike traditional automated systems with rigid menu options, modern AI receptionists use natural language processing (NLP) and machine learning to engage in fluid, human-like conversations.'
      },
      {
        type: 'paragraph',
        content: 'These intelligent systems can understand caller intent, answer common questions, route calls appropriately, schedule appointments, and even integrate with your existing business software.'
      },
      {
        type: 'heading',
        content: 'How AI Phone Receptionists Work',
        level: 2
      },
      {
        type: 'list',
        content: [
          'Voice Recognition and NLP: Converts speech to text and analyzes the meaning behind caller queries',
          'Machine Learning: Improves responses over time based on interactions',
          'Semantic Understanding: Grasps context and identifies caller needs beyond keywords',
          'Integration Capabilities: Connects with CRMs, scheduling systems, and business databases',
          'Voice Synthesis: Responds with natural-sounding speech that mimics human conversation'
        ]
      },
      {
        type: 'heading',
        content: 'Benefits of Using an AI Phone Receptionist',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'The advantages of implementing an AI receptionist extend far beyond simply automating call handling:'
      },
      {
        type: 'list',
        content: [
          'Cost Efficiency: Reduce staffing costs while maintaining 24/7 availability',
          'Consistency: Deliver reliable, high-quality responses with every interaction',
          'Scalability: Handle multiple calls simultaneously with no drop in performance',
          'Data Insights: Gather valuable analytics about customer inquiries and patterns',
          'Enhanced Customer Experience: Provide immediate responses without hold times',
          'Reduced Human Error: Eliminate mistakes in message taking or call routing'
        ]
      },
      {
        type: 'heading',
        content: 'Real-World Applications',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'AI phone receptionists are versatile solutions that benefit businesses across industries:'
      },
      {
        type: 'list',
        content: [
          'Healthcare: Appointment scheduling, prescription refill requests, and basic patient inquiries',
          'Professional Services: Client intake, basic consultations, and service information',
          'Hospitality: Reservation management, service requests, and local information',
          'Retail: Product availability checks, store hours, and order status updates',
          'Real Estate: Property information, scheduling viewings, and qualification questions'
        ]
      },
      {
        type: 'heading',
        content: 'AI Receptionists vs. Traditional Solutions',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'When compared to human receptionists or basic IVR systems, AI receptionists offer a compelling middle ground that combines the best of both worlds:'
      },
      {
        type: 'paragraph',
        content: 'Unlike human receptionists, AI solutions work 24/7 without breaks, sick days, or turnover. They can handle unlimited concurrent calls and maintain consistent performance regardless of call volume.'
      },
      {
        type: 'paragraph',
        content: 'Compared to traditional IVR systems, AI receptionists provide a much more natural interaction experience, understanding complex queries and adapting to caller needs rather than forcing them through rigid menu trees.'
      },
      {
        type: 'heading',
        content: 'Implementing an AI Phone Receptionist',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'For businesses considering an AI receptionist, the implementation process is surprisingly straightforward:'
      },
      {
        type: 'list',
        content: [
          'Needs Assessment: Identify your specific requirements and common call scenarios',
          'System Selection: Choose a solution that matches your business size and industry',
          'Integration: Connect with existing phone systems and business software',
          'Training: Provide information about your business to customize the AI responses',
          'Testing: Run pilot programs to refine responses and handling procedures',
          'Launch: Transition call handling to the AI system with appropriate monitoring'
        ]
      },
      {
        type: 'heading',
        content: 'The Future of AI Receptionists',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'As AI technology continues to advance, we can expect even more sophisticated capabilities from virtual receptionists:'
      },
      {
        type: 'list',
        content: [
          'Emotional Intelligence: Detecting and responding appropriately to caller emotions',
          'Enhanced Personalization: Recognizing repeat callers and tailoring experiences',
          'Multilingual Support: Seamlessly switching between languages based on caller preference',
          'Advanced Problem Solving: Handling increasingly complex inquiries without human intervention',
          'Proactive Engagement: Initiating outbound calls for appointment reminders or follow-ups'
        ]
      },
      {
        type: 'heading',
        content: 'Conclusion',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'AI phone receptionists represent a significant leap forward in business communication technology. By combining the consistency of automation with the natural feel of human interaction, these systems offer businesses of all sizes an opportunity to enhance customer service while optimizing operational costs.'
      },
      {
        type: 'paragraph',
        content: 'As we move further into 2024, the adoption of AI receptionists continues to accelerate across industries, signaling a fundamental shift in how businesses manage their communication channels.'
      }
    ],
    author: {
      name: 'Alex Johnson',
      role: 'AI Solutions Specialist',
      image: '/images/blog/authors/alex-johnson.jpg'
    }
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(article => article.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16">
        <SEO 
          title="Article Not Found | Flixby AI Blog" 
          description="The requested blog article could not be found."
          canonicalUrl={`https://flixby.io/blog/${slug}`}
        />
        <h1 className="text-3xl font-bold mb-6">Article Not Found</h1>
        <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="text-blue-500 hover:text-blue-700">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <SEO 
        title={`${article.title} | Flixby AI Blog`} 
        description={article.excerpt}
        canonicalUrl={`https://flixby.io/blog/${article.slug}`}
      />
      
      <div className="mb-10">
        <Link to="/blog" className="text-blue-500 hover:text-blue-700 mb-6 inline-block">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img 
              src={article.author.image} 
              alt={article.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{article.author.name}</p>
            <p className="text-gray-600 text-sm">{article.author.role}</p>
          </div>
          <div className="ml-auto text-gray-600">
            <span>{article.publishDate}</span>
            <span className="mx-2">•</span>
            <span>{article.category}</span>
          </div>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        {article.content.map((section, index) => {
          if (section.type === 'heading') {
            const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
            return <HeadingTag key={index} className="mt-8 mb-4 font-bold">{section.content}</HeadingTag>;
          }
          
          if (section.type === 'paragraph') {
            return <p key={index} className="mb-6">{section.content}</p>;
          }
          
          if (section.type === 'list' && Array.isArray(section.content)) {
            return (
              <ul key={index} className="list-disc pl-6 mb-6">
                {section.content.map((item, i) => (
                  <li key={i} className="mb-2">{item}</li>
                ))}
              </ul>
            );
          }
          
          if (section.type === 'quote') {
            return (
              <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic mb-6">
                {section.content}
              </blockquote>
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
};

export default BlogPost; 