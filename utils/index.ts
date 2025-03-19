export function calculateReadingTime(htmlContent:string) {
    // Remove HTML tags and trim whitespace
    const plainText = htmlContent.replace(/<[^>]*>/g, '').trim();
    
    // Count words
    const wordCount = plainText.split(/\s+/).length;
    
    // Average reading speed (words per minute)
    const wordsPerMinute = 200;
    
    // Calculate basic reading time
    let readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Count images
    const imageCount = (htmlContent.match(/<img/g) || []).length;
    
    // Add time for images (12 seconds for first, 11 for second, etc.)
    if (imageCount > 0) {
      let imageTime = 0;
      for (let i = 0; i < imageCount; i++) {
        imageTime += Math.max(12 - i, 3);
      }
      readingTime += Math.ceil(imageTime / 60);
    }
    
    // Ensure minimum reading time of 1 minute
    readingTime = Math.max(readingTime, 1);
    
    return readingTime;
  }
  