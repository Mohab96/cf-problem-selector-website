# Codeforces Problem Selector
## Preview

![](https://github.com/Mohab96/cf-problem-selector-website/blob/master/media/preview.gif)

## Description

Codeforces Problem Selector is a web app that helps you find Codeforces rated problems based on your preferences. It allows you to customize your problem selection by setting rating boundaries, choosing specific tags, and selecting the number of problems. You can also include some Codeforces handles for more personalized recommendations.

## How to use:

1. **Rating Boundaries:** Set the minimum and maximum ratings for the Codeforces problems you want.

2. **Tags (Optional):** Choose specific tags for the problems. If no tags are selected, problems from all tags will be included.

3. **Number of Problems (N):** Specify the number of Codeforces problems you want to generate.

4. **Codeforces Handles (Optional):** Add one or more Codeforces handles, separated by commas. The app considers the problems unsolved by these handles.

5. **Save/Erased Preferences:** Save or erase your preferences locally. This feature allows you to come back at any time and find your settings ready for you.

### Output:

The app generates (N) Codeforces rated problems with ratings between the specified minimum and maximum. The problems will only have the tags selected, and they must be unsolved by any of the provided Codeforces handles.

#### Valid Combinations:
If, for example, the user selects `number theory`, `math`, and `dp`, the following combinations are valid:
- `number theory`
- `math`
- `dp`
- `dp`, `math`
- `dp`, `number theory`
- `math`, `number theory`
- `math`, `number theory`, `dp`

# What is special about this app (a proof that I didn't reinvent the wheel)?

This app addresses common issues faced while practicing on other platforms:
- You know the rating of the problems you're going to solve, unlike live contests.
- You don't know the tags of the problems, providing a challenge and learning opportunity.
- You know that the problems will not have any tag that you don't know, so you will not try to solve a problem for plenty of hours in vain! 

*The approach in creating this app was to make it usable, focusing on practical features without overwhelming complexity.*
