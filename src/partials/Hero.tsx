import {
  GradientText,
  HeroAvatar,
  HeroSocial,
  Section,
} from 'astro-boilerplate-components';

const getBlueText = (text: string) => <span className="text-cyan-400 hover:underline"> {text}</span>
const introName = (text: string) => <span style={{color: "rgba(25, 189, 236, 0.9)"}}> {text}</span>

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm {introName("Jean-Loïc")} 👋
        </>
      }
      description={
        <>
        I'm a passionate Software Engineer specializing in 
        {getBlueText("Big Data")}. I share insights and tutorials 
        on Data Engineering.
        It's the perfect place for Data and Software Engineers looking to get a handle on topics like 
        {getBlueText("Functional Programming")}, proper {getBlueText("Object Oriented Programming")}, 
        {getBlueText("Scala")}, {getBlueText("System Design")}, and more 
        all explained in a friendly, accessible way.
        </>
      }
      avatar={
        <img
          className="h-80 w-50"
          src="/assets/images/avatar.png"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="/">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="Twitter icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/facebook-icon.png"
              alt="Facebook icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/linkedin-icon.png"
              alt="Linkedin icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/youtube-icon.png"
              alt="Youtube icon"
            />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
