<p align="center">
  <a href="https://minnekdigital.com/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.minnekdigital.com/logo-md.jpg">
      <img alt="Minnek Logo" src="https://assets.minnekdigital.com/logo-md.jpg">
    </picture>    
  </a>
</p>

---

# Recruitment Test for Full Stack Position

Welcome to the recruitment test for the Full Stack position at our company! The test aims to assess your programming skills, problem-solving abilities, and understanding of web development concepts. Please read the instructions for each task carefully before starting.

## Keep in mind
- Please use real Github accounts, we want to check your contributions history. Since we use, create, and contribute to open source.
- Everyone work with the same set of information, to let us fairly judge your work.
- We are answering questions only when it's strictly necessary.
- The test is designed in a way, that can confuse you or seems weird because we want to test you in a way worse environment than you will work on a daily basis. It's also not a representation of the tech stack we are using in real projects.


## Before you start

- Fork this repository to create your own copy on GitHub. Keep it publicly available.
- Complete each task in its designated folder and provide clear instructions on how to run your code.
- Take into account User Experience (UX) and ensure the user interface is usable and responsive.
- Include all assets and resources necessary to run your project.

## Task 1 - Fundamental Programming
Write a function to reverse the elements of a given array while keeping special characters in their original positions. The function should handle dynamic changes in the array and special character positions. For example:

Input:
```js
['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8]
```

Expected Output:
```js
[8, 'z', '&', 'b', 'j', 'a', '$', 'i', 47, 'q', 9, 'l', 'a', 2, '%', 'n']
```

**Note:**
```diff
- The solution needs to be dynamic (if the special character's position changed, keep it as same).
```

## Task 2 - Fetch Data from API

Create a web page that fetches data from the [Dog API](https://dog.ceo/dog-api/), display the following information:

- List all the dog breeds
- Show the dog image and name
- Add hover state to dog image to show the first three dog sub-breeds
- Don’t use any CSS library or framework
- Follow the UI Mockup to complete this task.

![Task 2](/assets/task_2.jpg)

Mockup for Dog API | API: https://dog.ceo/dog-api/

The grid needs to be responsive.

## Task 3 - User Authentication and Product Display

Create a web application for managing products with user authentication. The application should have the following features:

1. User Registration and Login: Users should be able to register and log in to the application. (Keep in mind the good practices and security measures).
2. Product Management: Only `Authenticated users` can add new products with the following details: Product Name, Price, Description, and Product Image (not URL).
3. Product Carousel: Display a carousel of product images and names based on the provided design mockup.

**Important**: `The carousel should only be accessible to logged-in users`.


![Task 3](/assets/task_3.jpg)

## Evaluation

We will evaluate your solutions based on the following criteria:
- Code quality and readability.
- Functionality and correctness of the implemented tasks.
- User Experience (UX) design in Task 2 and Task 3.
- Proper validation and error handling.

### Extra Points

You can earn extra points by implementing the following features:
- Unit tests for the implemented tasks.
- Dockerizing the application.
- Deploying the application to a cloud platform (e.g., Vercel, AWS, etc.).
- Using a modern JavaScript framework (e.g., React, Vue, etc.) for Task 2 & Task 3.


## Submission

When you have completed the tasks, share the repository URL with us via email. Please ensure that the repository remains publicly accessible.

Good luck! We look forward to reviewing your work. 🤗

## About

<a href="https://minnekdigital.com/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.minnekdigital.com/logo-sm.jpg">
    <img alt="Minnek Logo" src="https://assets.minnekdigital.com/logo-sm.jpg">
  </picture>
</a>

This project is maintained and funded by Minnek.

We ❤️ open source and do our part in sharing our work with the community!
See [our other projects][community] or [hire our team][hire] to help build your product.

Want to join? [Check out our Jobs][jobs]!

[community]: https://github.com/Minnek-Digital-Studio
[hire]: https://minnekdigital.com/
[jobs]: https://minnekdigital.com/careers
