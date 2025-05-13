// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: "ASIA2FA3SK4ID5O3WVR3",
    secretAccessKey: "iAekFSw0jfwNC0CUZD5KY/rDP1yBn5Z6UmW7euFO",
    sessionToken: "IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQC+LGNy+Dk41+bYwSyG6aCeO5qHrct+4USzltHVOxMhtAIganT3IQfwVuHKmp5QfH/ZIiTJYnVHsv6BpiPMgHR/dJUqvQII7P//////////ARABGgw2OTc5OTAwMTA2NDAiDI3rSYCYJrzhV9Mv9SqRAn8JcrhNqpekYayk6xUuo/GmE4pu5sceBNzpTZi2tmR0wdnVN5pR49ONNFeZGO5YROC+myYpLghJO6F3CHahCYRjN2OoZB4McBqs5f7df1BE7q/GeN468A5lcead7uiXIKGvV0auwjgwPXYszYmwmYHDmPOLlrl8pWD0teexrRDLlfwTESERhpqVns9VwSKJC3Wb+qIonJSM2R7mkhCoJBq6QDHy7KhtExVdCW1jQSPvfZqLkJiG/ONUcRSuXeNnfuPCPFBl4wZ8BwAgFwfSdtZlCqhOZtzJH3NMyzH+QD0KxK/rD8NLyt9L36IUhli0U5q0zOgBsTsksm5w7Q5sfz1P2uHXMMrvLUa7gZmnJVP8DDCX1YzBBjqdAQZ4R9/bwSx3QLKqh9J+KWZM3z2RaLZTZddmwc9pZApid9YwrzljROZ46Nyfm6zZSHd51NOCiMyoDOYNR79FQYaJC8NYK1iTjy9c8MQlFpTFyFqgQZlyC1nyNuQ0fanXXWm3f5doimALOQbhPE9HQ5BU7YjrnFHE9/vjY5rV0jTN77z8UMEoUha/abv2bOYmzdmpYVwiwDcIR00pMzY=",
    region: "us-east-1",
});

export default s3;
