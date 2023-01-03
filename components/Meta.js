import Head from 'next/head'

const Meta = ({ title, description, keywords, image, url }) => {
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width,
        initial-scale=1'
      />
      <meta name='robots' content='index,follow' />
      <meta charSet='utf-8' />

      <meta name='title' content={title} />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta name='subject' content='online courses' />
      <meta name='language' content='english' />
      <link rel='icon' href='/images/favicon.png' />

      <title>{title}</title>

      {
        //<!-- Open Graph / Facebook -->
      }
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={`https://coursemajor.com/${image}`} />

      {
        //<!-- Twitter -->
      }
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta
        property='twitter:image'
        content={`https://coursemajor.com/${image}`}
      />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'CourseMajor: Your #1 Place for Online Courses',
  keywords:
    'coursemajor, finance courses, online finance courses, personal finance courses, free finance courses, free online finance courses, financial accounting refresher course, business intelligence cours, blockchain course, free cost accounting classes online, cost accounting free online course, crash course managerial accounting, it support fundamentals, real estate course',
  description:
    'Get motivated to Learn on a global online learning platform that offers anyone, anywhere access to free and paid courses. Learn from your bedroom in niches such as Finance. Learn now for free.',
  image: 'http://localhost:3000/brand/CourseMajor-logos-wide.jpeg',
  url: 'http://coursemajor.com'
};

export default Meta