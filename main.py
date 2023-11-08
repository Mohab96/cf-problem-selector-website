import requests
import random
import webbrowser
import argparse

# handles to choose problems not problems not solved by any one of them
not_solved_by = ['Mohab_Yaser']

# problems not solved by any handle in "not_solved_by"
problems_out_of_scope = set([])


def remove_solved_problems():
    # extracting all the problems solved by all handles in "not_solved_by"
    for handle in not_solved_by:
        user = f'https://codeforces.com/api/user.status?handle={handle}'
        submissions = requests.get(user).json()
        if submissions.get('status') != 'FAILED':
            for submission in submissions['result']:
                if submission.get('verdict') == 'OK':
                    problems_out_of_scope.add(
                        submission.get('problem').get('name'))


DEFAULT_MIN_RATE = 1300
DEFAULT_MAX_RATE = 1500
DEFAULT_PROBLEMS_CNT = 1


def get_args():
    parser = argparse.ArgumentParser()

    parser.add_argument("-o", "--open",
                        help="Whether you want the problems to be opened directly in your browser or not [y/n].",
                        type=str, default=False)

    parser.add_argument("-c", "--count",
                        help="The number of problems you wanna get.",
                        type=int, default=DEFAULT_PROBLEMS_CNT)

    parser.add_argument("-mn", "--minRate",
                        help="The rate that you don't want to get any problems with rate less than it.",
                        type=int, default=DEFAULT_MIN_RATE)

    parser.add_argument("-mx", "--maxRate",
                        help="The rate that you don't want to get any problems with rate more than it.",
                        type=int, default=DEFAULT_MAX_RATE)

    args = parser.parse_args()

    return args


available_problems = []

url = 'https://codeforces.com/api/problemset.problems'
problemset = requests.get(url).json()

# tags that I want to see one or more of them in all problems (and only them)
desired_tags = ['binary search',
                'bitmasks',
                'brute force',
                'combinatorics',
                'constructive algorithms',
                'data structures',
                'dfs and similar',
                'dp',
                'dsu',
                'graphs',
                'greedy',
                'implementation',
                'math',
                'number theory',
                'ternary search',
                'trees',
                'two pointers',
                'sortings'
                ]


def valid(problem, min, max):
    # if solved by any user in "not_solved_by"
    if problem.get('name') in problems_out_of_scope:
        return False

    rate = problem.get('rating', 0)

    # if the rate is not in the desired rage
    if rate < min or rate > max:
        return False

    # if it have any tag that I don't want
    for tag in problem.get('tags'):
        if tag not in desired_tags:
            return False
    return True


def filter_problems(min=DEFAULT_MIN_RATE, max=DEFAULT_MAX_RATE):
    for problem in problemset['result']['problems']:
        if valid(problem, min, max):
            available_problems.append(problem)


def get_the_problems(problems_cnt=DEFAULT_PROBLEMS_CNT, open=False):
    random.shuffle(available_problems)

    for i in range(problems_cnt):
        index = str(available_problems[i].get('index'))
        contestID = available_problems[i].get('contestId')

        link = f'https://codeforces.com/contest/{contestID}/problem/{index}'

        print(link)

        if open:
            webbrowser.open(link)


if __name__ == '__main__':
    remove_solved_problems()
    args = get_args()

    mn = args.__dict__['minRate']
    mx = args.__dict__['maxRate']
    cnt = args.__dict__['count']
    opn = args.__dict__['open']

    assert cnt > 0, 'Enter a positive number of problems'
    assert mn >= 800 and mn <= 3500, 'Enter a min rating between 800 and 3500'
    assert mx >= 800 and mx <= 3500, 'Enter a max rating between 800 and 3500'
    assert mn <= mx, 'The max is less than min'
    assert opn == 'y' or opn == 'n', "Enter \'y\' or \'n\'"

    filter_problems(mn, mx)
    get_the_problems(cnt, True if opn == 'y' else False)
