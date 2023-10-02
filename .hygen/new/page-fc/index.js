module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'コンポーネント名は何？（ex: Login',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { component_name } = answers;

      const path = `pages/${component_name}`;
      const abs_path = `src/components/${path}`;
      const page_component_name = `${component_name}Page`;

      const storybook_title = `ページ/${component_name}`;

      return {
        ...answers,
        path,
        abs_path,
        page_component_name,
        storybook_title,
      };
    });
  },
};
