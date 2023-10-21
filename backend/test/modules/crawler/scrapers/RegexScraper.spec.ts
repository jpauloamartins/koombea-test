import { RegexScraper } from '../../../../src/modules/crawler/scrapers/RegexScraper';

describe('RegexScraper', () => {
  let scraper: RegexScraper;

  beforeEach(() => {
    scraper = new RegexScraper();
  });

  it('should not find anything', () => {
    const result = scraper.scrape('random string');

    expect(result).toEqual({
      title: '',
      links: [],
    });
  });

  it('should be able to scrape page title', () => {
    const result = scraper.scrape(`
      <html>
      any content
      <title>Expected Title</title>
      any content
      </html>
    `);

    expect(result).toEqual({
      title: 'Expected Title',
      links: [],
    });
  });

  it('should be able to scrape page title when title tag have properties', () => {
    const result = scraper.scrape(`
      <html>
      any content
      <title prop="test">Expected Title</title>
      any content
      </html>
    `);

    expect(result).toEqual({
      title: 'Expected Title',
      links: [],
    });
  });

  it('should be able to scrape page title when title have line breaks', () => {
    const result = scraper.scrape(`
      <html>
      any content
      <title>
        Expected Title
      </title>
      any content
      </html>
    `);

    expect(result).toEqual({
      title: 'Expected Title',
      links: [],
    });
  });

  it('should be able to scrape link', () => {
    const result = scraper.scrape(`
      <a href="https://koombea.com">Koombea</a>
    `);

    expect(result).toEqual({
      title: '',
      links: [
        {
          url: 'https://koombea.com',
          label: 'Koombea',
        },
      ],
    });
  });

  it('should be able to scrape multiple links', () => {
    const result = scraper.scrape(`
      <a href="https://koombea.com">Koombea</a>
      <a href="https://google.com">Google</a>
    `);

    expect(result).toEqual({
      title: '',
      links: [
        {
          url: 'https://koombea.com',
          label: 'Koombea',
        },
        {
          url: 'https://google.com',
          label: 'Google',
        },
      ],
    });
  });

  it('should be able to scrape links when content have line breaks', () => {
    const result = scraper.scrape(`
      any content
      <a
        href="https://koombea.com"
      >
        Koombea
      </a> any content
      any content
      <a
        href="https://google.com"
      >
        Google
      </a> any content
    `);

    expect(result).toEqual({
      title: '',
      links: [
        {
          url: 'https://koombea.com',
          label: 'Koombea',
        },
        {
          url: 'https://google.com',
          label: 'Google',
        },
      ],
    });
  });

  it('should be able to scrape links when a tag have other properties', () => {
    const result = scraper.scrape(`
      any content
      <a
        href="https://koombea.com"
        target="_blank"
      >
        Koombea
      </a> any content
      any content
      <a
        target="_blank"
        href="https://google.com"
      >
        Google
      </a> any content
    `);

    expect(result).toEqual({
      title: '',
      links: [
        {
          url: 'https://koombea.com',
          label: 'Koombea',
        },
        {
          url: 'https://google.com',
          label: 'Google',
        },
      ],
    });
  });
});
