/**
 * Běh kvízu na routě /kvizy/<id>.
 *
 * ID se bere z URL (poslední segment cesty) a hledá se v registru window.KVIZY
 * z /kviz-data.js – tam je taky popsaný systém, podle kterého se ID tvoří.
 *
 * Průběh: otázka → vyhodnocení → další otázka → na konci každého kola
 * přestávka se skóre kola → po posledním kole výsledek s přehledem chyb.
 *
 * Pořadí možností se míchá při startu, takže správná odpověď není pořád na
 * stejném místě (v datech je vždy první).
 */
(function () {
  'use strict'

  var ID_PATTERN = /^[a-z]{2}-\d{2}-\d{2}$/
  var LETTERS = ['A', 'B', 'C', 'D']

  var app = document.getElementById('kvizApp')
  var nameSlot = document.getElementById('kvizName')

  /* ---------- POMOCNÉ ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag)
    if (className) node.className = className
    if (text != null) node.textContent = text
    return node
  }

  function fail(message) {
    app.innerHTML = ''
    var back = el('a', 'btn ghost', 'Zpět na kvízy')
    back.href = '/kvizy'
    var actions = el('div', 'kv-actions')
    actions.appendChild(back)
    app.append(el('p', 'empty', message), actions)
  }

  /** Fisher–Yates nad kopií, původní pole zůstává netknuté. */
  function shuffled(items) {
    var copy = items.slice()
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var tmp = copy[i]
      copy[i] = copy[j]
      copy[j] = tmp
    }
    return copy
  }

  /* ---------- PŘÍPRAVA OTÁZEK ---------- */

  /** Kola rozbalí do jednoho seznamu a zamíchá možnosti u každé otázky. */
  function buildItems(kviz) {
    return kviz.rounds.reduce(function (items, round, roundIndex) {
      var prepared = round.questions.map(function (question) {
        return {
          roundIndex: roundIndex,
          roundTitle: round.title,
          text: question.q,
          note: question.n || '',
          correct: question.o[0],
          options: shuffled(
            question.o.map(function (option, optionIndex) {
              return { text: option, correct: optionIndex === 0 }
            })
          ),
        }
      })
      return items.concat(prepared)
    }, [])
  }

  /* ---------- STAV ---------- */

  var kviz = null
  var items = []
  var state = null

  function initialState() {
    return { index: 0, phase: 'question', picked: -1, answers: [] }
  }

  function setState(patch) {
    state = Object.assign({}, state, patch)
    render()
  }

  function countCorrect(answers) {
    return answers.filter(function (answer) {
      return answer.ok
    }).length
  }

  function roundScore(roundIndex) {
    var answered = state.answers.filter(function (answer) {
      return answer.roundIndex === roundIndex
    })
    return { ok: countCorrect(answered), total: answered.length }
  }

  /* ---------- AKCE ---------- */

  function pick(optionIndex) {
    if (state.phase !== 'question') return
    var item = items[state.index]
    var option = item.options[optionIndex]
    var answer = {
      roundIndex: item.roundIndex,
      question: item.text,
      pickedText: option.text,
      correctText: item.correct,
      ok: option.correct,
    }
    setState({ phase: 'answered', picked: optionIndex, answers: state.answers.concat([answer]) })
  }

  function advance() {
    var nextIndex = state.index + 1
    if (nextIndex >= items.length) {
      setState({ phase: 'done' })
      return
    }
    var startsNewRound = items[nextIndex].roundIndex !== items[state.index].roundIndex
    setState({ index: nextIndex, phase: startsNewRound ? 'break' : 'question', picked: -1 })
  }

  function toTop() {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  function continueToNextRound() {
    setState({ phase: 'question' })
    toTop()
  }

  function restart() {
    items = buildItems(kviz)
    state = initialState()
    render()
    toTop()
  }

  /* ---------- VYKRESLENÍ: OTÁZKA ---------- */

  function progressFragment() {
    var item = items[state.index]
    var fragment = document.createDocumentFragment()

    var topbar = el('div', 'kv-topbar')
    var label = el('div', 'kv-round-label')
    label.append(
      document.createTextNode('Kolo ' + (item.roundIndex + 1) + '/' + kviz.rounds.length + ' · '),
      el('b', null, item.roundTitle)
    )
    topbar.append(label, el('div', 'kv-count', state.index + 1 + ' / ' + items.length))

    var bar = el('div', 'kv-bar')
    var fill = el('i')
    fill.style.width = (state.answers.length / items.length) * 100 + '%'
    bar.appendChild(fill)

    fragment.append(topbar, bar)
    return fragment
  }

  function optionButton(option, optionIndex) {
    var button = el('button', 'kv-option')
    button.type = 'button'
    button.append(
      el('span', 'kv-letter', LETTERS[optionIndex]),
      el('span', null, option.text),
      el('span', 'kv-mark')
    )

    if (state.phase !== 'answered') {
      button.addEventListener('click', function () {
        pick(optionIndex)
      })
      return button
    }

    button.disabled = true
    var mark = button.querySelector('.kv-mark')
    if (option.correct) {
      button.classList.add('is-ok')
      mark.textContent = '✓'
    } else if (optionIndex === state.picked) {
      button.classList.add('is-bad')
      mark.textContent = '✕'
    } else {
      button.classList.add('is-dim')
    }
    return button
  }

  function renderQuestion() {
    var item = items[state.index]
    app.innerHTML = ''
    app.appendChild(progressFragment())

    var stage = el('div', 'kv-stage')
    stage.appendChild(el('h1', 'kv-question', item.text))

    var options = el('div', 'kv-options')
    item.options.forEach(function (option, optionIndex) {
      options.appendChild(optionButton(option, optionIndex))
    })
    stage.appendChild(options)

    var feedback = el('div', 'kv-feedback')
    feedback.setAttribute('role', 'status')
    feedback.setAttribute('aria-live', 'polite')
    stage.appendChild(feedback)

    if (state.phase !== 'answered') {
      app.appendChild(stage)
      return
    }

    var answer = state.answers[state.answers.length - 1]
    feedback.appendChild(
      el(
        'div',
        'kv-verdict ' + (answer.ok ? 'ok' : 'bad'),
        answer.ok ? 'Správně' : 'Správně je ' + answer.correctText
      )
    )
    if (item.note) feedback.appendChild(el('div', 'kv-note', item.note))

    var isLastQuestion = state.index + 1 >= items.length
    var next = el('button', 'btn', isLastQuestion ? 'Zobrazit výsledek →' : 'Další otázka →')
    next.type = 'button'
    next.addEventListener('click', advance)

    var actions = el('div', 'kv-actions')
    actions.append(next, el('span', 'kv-hint', 'nebo Enter'))
    stage.appendChild(actions)

    app.appendChild(stage)
    next.focus({ preventScroll: true })
  }

  /* ---------- VYKRESLENÍ: PŘESTÁVKA MEZI KOLY ---------- */

  function renderBreak() {
    var nextRoundIndex = items[state.index].roundIndex
    var finishedIndex = nextRoundIndex - 1
    var score = roundScore(finishedIndex)

    app.innerHTML = ''
    var panel = el('div', 'kv-panel')
    panel.appendChild(el('div', 'kv-eyebrow', 'Kolo ' + (finishedIndex + 1) + ' hotovo'))

    var heading = el('h1', 'kv-score')
    heading.append(document.createTextNode(String(score.ok)), el('span', 'kv-of', '/ ' + score.total))
    panel.append(heading, el('p', 'kv-lead', kviz.rounds[finishedIndex].title))
    panel.appendChild(
      el(
        'p',
        'kv-lead',
        'Celkem zatím ' +
          countCorrect(state.answers) +
          ' z ' +
          state.answers.length +
          '. Následuje kolo ' +
          (nextRoundIndex + 1) +
          ' – ' +
          items[state.index].roundTitle +
          '.'
      )
    )

    var next = el('button', 'btn', 'Pokračovat →')
    next.type = 'button'
    next.addEventListener('click', continueToNextRound)

    var actions = el('div', 'kv-actions')
    actions.append(next, el('span', 'kv-hint', 'nebo Enter'))
    panel.appendChild(actions)

    app.appendChild(panel)
    next.focus({ preventScroll: true })
  }

  /* ---------- VYKRESLENÍ: VÝSLEDEK ---------- */

  function verdictFor(percent) {
    if (percent >= 90)
      return { title: 'Hospodský mistr', lead: 'Tohle už není znalost, tohle je diagnóza. Kraj znáte líp než vlastní kuchyň.' }
    if (percent >= 70)
      return { title: 'Ostřílený štamgast', lead: 'Solidní výkon. Pár otázek vás dostalo, ale první kolo byste vyhráli.' }
    if (percent >= 50)
      return { title: 'Průměr u výčepu', lead: 'Půl na půl. Základ máte, zbytek chce ještě jednu návštěvu kraje.' }
    if (percent >= 30)
      return { title: 'Ještě jedno kolo', lead: 'Něco tam zůstalo, ale hodně jste tipovali. Zkuste to znovu.' }
    return { title: 'Zeptejte se souseda', lead: 'Pardubický kraj vám zatím moc neříká. Což se dá napravit.' }
  }

  function roundTable() {
    var table = el('div', 'kv-rounds')
    kviz.rounds.forEach(function (round, roundIndex) {
      var score = roundScore(roundIndex)
      var cell = el('div', 's', score.ok + ' / ' + score.total)
      if (score.total && score.ok === score.total) cell.classList.add('full')
      else if (score.total && score.ok * 2 <= score.total) cell.classList.add('weak')

      var row = el('div', 'row')
      row.append(el('div', 'n', String(roundIndex + 1).padStart(2, '0')), el('div', 't', round.title), cell)
      table.appendChild(row)
    })
    return table
  }

  function reviewList() {
    var missed = state.answers.filter(function (answer) {
      return !answer.ok
    })
    if (!missed.length) return null

    var review = el('div', 'kv-review')
    review.appendChild(el('h3', null, 'Co nevyšlo (' + missed.length + ')'))
    missed.forEach(function (answer) {
      var block = el('div', 'kv-miss')
      block.appendChild(el('div', 'mq', answer.question))
      var line = el('div', 'ma')
      line.append(
        document.createTextNode('Vaše odpověď: '),
        el('s', null, answer.pickedText),
        document.createTextNode(' · správně: '),
        el('b', null, answer.correctText)
      )
      block.appendChild(line)
      review.appendChild(block)
    })
    return review
  }

  function renderResult() {
    var score = countCorrect(state.answers)
    var percent = Math.round((score / items.length) * 100)
    var verdict = verdictFor(percent)

    app.innerHTML = ''
    var panel = el('div', 'kv-panel')
    panel.appendChild(el('div', 'kv-eyebrow', 'Konec kvízu · ' + percent + ' %'))

    var heading = el('h1', 'kv-score')
    heading.append(document.createTextNode(String(score)), el('span', 'kv-of', '/ ' + items.length))
    panel.append(heading, el('h2', null, verdict.title), el('p', 'kv-lead', verdict.lead))

    var again = el('button', 'btn', 'Zkusit znovu')
    again.type = 'button'
    again.addEventListener('click', restart)
    var back = el('a', 'btn ghost', 'Zpět na kvízy')
    back.href = '/kvizy'

    var actions = el('div', 'kv-actions')
    actions.append(again, back)
    panel.appendChild(actions)

    panel.appendChild(roundTable())
    var review = reviewList()
    if (review) panel.appendChild(review)

    app.appendChild(panel)
  }

  /* ---------- ROUTER VYKRESLENÍ ---------- */

  function render() {
    if (state.phase === 'done') renderResult()
    else if (state.phase === 'break') renderBreak()
    else renderQuestion()
  }

  /* ---------- KLÁVESNICE ---------- */

  /** Tlačítko „Další / Pokračovat“ dostává fokus, takže Enter na něm odbaví
   *  prohlížeč sám. Bez téhle pojistky by se akce provedla dvakrát a kvíz
   *  by přeskočil otázku. */
  function isButtonFocused() {
    var active = document.activeElement
    return !!active && (active.tagName === 'BUTTON' || active.tagName === 'A')
  }

  function onKeydown(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return

    if (state.phase === 'question') {
      var byLetter = LETTERS.indexOf(event.key.toUpperCase())
      var byNumber = '1234'.indexOf(event.key)
      var optionIndex = byLetter > -1 ? byLetter : byNumber
      if (optionIndex > -1 && optionIndex < items[state.index].options.length) {
        event.preventDefault()
        pick(optionIndex)
      }
      return
    }

    if (event.key !== 'Enter' || isButtonFocused()) return

    if (state.phase === 'answered') {
      event.preventDefault()
      advance()
    } else if (state.phase === 'break') {
      event.preventDefault()
      continueToNextRound()
    }
  }

  /* ---------- START ---------- */

  var id = location.pathname.split('/').filter(Boolean).pop()

  if (!ID_PATTERN.test(id || '') || !window.KVIZY || !window.KVIZY[id]) {
    fail('Takový kvíz neznám.')
    return
  }

  kviz = window.KVIZY[id]
  items = buildItems(kviz)
  state = initialState()

  document.title = 'Hospodský kvíz: ' + kviz.title + ' — Michal Tvaroh'
  if (nameSlot) nameSlot.textContent = 'Hospodský kvíz: ' + kviz.title

  render()
  document.addEventListener('keydown', onKeydown)
})()
